import { Socket } from 'node:net';
import { constants } from './utils/constants';
import type { MasterListCache, ServerInfo } from './utils/types';
import { parseServerInfo } from './utils/utils';

/*
 * Inspired on https://gist.github.com/iMoD1998/50fc916904ccacf8a8a010e3d05aac65
 * Thanks to @iMoD1998
 */

export class MasterServer
{
	host: string;
	port: number;
	socket: Socket;
	cache: MasterListCache = {
		serversCount: 0,
		servers: new Map(),
	};

	constructor(host: string, port: number)
	{
		this.host = host;
		this.port = port;
		this.socket = new Socket();
	}

	fetchInfo = () => this.socket.write(Buffer.from([0x04, 0x03, 0x00, 0x00]));

	async connect()
	{
		return new Promise<void>((resolve, reject) =>
		{
			this.socket.once('error', (err) => reject(err));
			this.socket.connect(this.port, this.host, () => resolve());
		});
	}

	async readAll(): Promise<Buffer[]>
	{
		return new Promise((resolve, reject) =>
		{
			const buffers: Buffer[] = [];

			const onData = (data: Buffer) => buffers.push(data);
			this.socket.on('data', onData);

			this.socket.on('end', () =>
			{
				this.socket.removeListener('data', onData);
				resolve(buffers);
			});

			this.socket.on('error', (error) =>
			{
				this.socket.removeListener('data', onData);
				reject(error);
			});
		});
	}

	async read(length: number): Promise<Buffer>
	{
		return new Promise((resolve) =>
		{
			const onData = (data: Buffer) =>
			{
				if (data.length >= length)
				{
					this.socket.removeListener('data', onData);
					resolve(data.slice(0, length));
				}
			};

			this.socket.on('data', onData);
		});
	}

	async getServers(updateCache = true)
	{
		this.fetchInfo();

		const rawData = Buffer.concat(await this.readAll());
		const numServers = rawData.readUIntLE(0, 2); // first two bytes are servers count
		const serverList = new Map<string, ServerInfo>();

		// parse raw data
		for (let i = 2; i < rawData.length; i += constants.serverInfo.SIZE) // starts in 2 so we skip servers count
		{
			const raw = rawData.slice(i, i + constants.serverInfo.SIZE);
			const info = parseServerInfo(raw);

			serverList.set(`${info.ip}:${info.port}`, info);
		}

		// update cache
		if (updateCache)
		{
			this.cache = {
				serversCount: numServers,
				servers: serverList,
			};
		}

		// return data
		return {
			count: numServers,
			servers: serverList,
		};
	}
}
