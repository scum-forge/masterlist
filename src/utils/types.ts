export interface RawServerInfo
{
	ip: number;
	port: number;
	name: string;
	playersCount: number;
	maxPlayers: number;
	timeHour: number;
	unk1: string;
	passwordByte: number;
	unk2: string;
	versionBuild: number;
	versionPatch: number;
	versionMinor: number;
	versionMajor: number;
}

export type ServerInfo = { ip: string; } & Omit<RawServerInfo, 'ip'>;

export interface MasterListCache
{
	serversCount: number;
	servers: Map<string, ServerInfo>;
}
