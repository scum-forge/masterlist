import { constants } from './constants';
import type { RawServerInfo, ServerInfo } from './types';

// eslint-disable-next-line no-bitwise
export const ipFromLong = (ip: number) => `${ip >>> 24}.${(ip >> 16) & 255}.${(ip >> 8) & 255}.${ip & 255}`;

export function parseServerInfo(rawData: Buffer): ServerInfo
{
	const ctx = constants.serverInfo.readContext(rawData, 0, {});
	const data = ctx.data as RawServerInfo;

	return {
		ip: ipFromLong(data.ip),
		port: data.port,
		name: data.name.replace(/\0+$/, ''),
		playersCount: data.playersCount,
		maxPlayers: data.maxPlayers,
		timeHour: data.timeHour,
		unknown1: data.unknown1,
		passwordByte: data.passwordByte,
		unknown2: data.unknown2,
		versionBuild: data.versionBuild,
		versionPatch: data.versionPatch,
		versionMinor: data.versionMinor,
		versionMajor: data.versionMajor,
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
