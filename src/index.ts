import { MasterServer } from './MasterServer';
import { constants } from './utils/constants';
import { prettifyServerInfo } from './utils/utils';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () =>
{
	const master = new MasterServer(constants.masterServers[0].host, constants.masterServers[0].port);

	console.log(`Trying to connect to ${constants.masterServers[0].host}:${constants.masterServers[0].port}...`);
	await master.connect();

	console.log('Trying to fetch servers info...');
	const data = await master.getServers();

	console.log(`Servers count: ${data.count} (${data.servers.size})`);

	// we do not need a complete regex, only a basic input check
	const desiredServer = process.argv.slice(2)[0];
	if (desiredServer !== undefined && /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}:\d{1,4}$/.test(desiredServer))
	{
		console.log(`Trying to fetch server info for ${desiredServer}...`);
		const svInfo = data.servers.get(desiredServer);
		if (svInfo) console.log(prettifyServerInfo(svInfo));
	}
})();
