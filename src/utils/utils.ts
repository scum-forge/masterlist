import { unpack } from 'python-struct';
import { constants } from './constants';
import type { ServerInfo } from './types';

// eslint-disable-next-line no-bitwise
export const ipFromLong = (ip: number) => `${ip >>> 24}.${(ip >> 16) & 255}.${(ip >> 8) & 255}.${ip & 255}`;

export function parseServerInfo(rawData: Buffer): ServerInfo
{
	const [
		ip,
		port,
		nameBuffer,
		playersCount,
		maxPlayers,
		timeHour,
		unk1,
		passwordByte,
		unk2,
		versionBuild,
		versionPatch,
		versionMinor,
		versionMajor,
	] = unpack(constants.serverInfo.format, rawData);

	return {
		ip: ipFromLong(ip as number),
		port: port as number,
		name: (nameBuffer as unknown as Buffer).toString('latin1').replace(/\0+$/, ''),
		playersCount: playersCount as number,
		maxPlayers: maxPlayers as number,
		timeHour: timeHour as number,
		unk1: unk1 as string,
		passwordByte: passwordByte as number,
		unk2: unk2 as string,
		versionBuild: versionBuild as number,
		versionPatch: versionPatch as number,
		versionMinor: versionMinor as number,
		versionMajor: versionMajor as number,
	};
}

export function prettifyServerInfo(info: ServerInfo)
{
	return {
		host: `${info.ip}:${info.port}`,
		name: info.name,
		players: `${info.playersCount}/${info.maxPlayers}`,
		time: `${info.timeHour.toString().padStart(2, '0')}:00`,
		hasPassword: ((info.passwordByte >> 1) & 1) === 1, // eslint-disable-line no-bitwise
		version: `${info.versionMajor}.${info.versionMinor}.${info.versionPatch}.${info.versionBuild}`,
	};
}
