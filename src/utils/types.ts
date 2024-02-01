export interface RawServerInfo
{
	ip: number;
	port: number;
	name: string;
	pad: null;
	playersCount: number;
	maxPlayers: number;
	timeHour: number;
	unknown1: number;
	passwordByte: number;
	unknown2: string;
	versionBuild: number;
	versionPatch: number;
	versionMinor: number;
	versionMajor: number;
}

export type ServerInfo = { ip: string; } & Omit<RawServerInfo, 'ip' | 'pad'>;

export interface MasterListCache
{
	serversCount: number;
	servers: Map<string, ServerInfo>;
}
