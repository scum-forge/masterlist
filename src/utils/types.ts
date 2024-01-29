export interface ServerInfo
{
	ip: string;
	port: number;
	name: string;
	playersCount: number;
	maxPlayers: number;
	timeHour: number;
	unk: number;
	versionBuild: string;
	versionPatch: number;
	versionMinor: number;
	versionMajor: number;
}

export interface MasterListCache
{
	serversCount: number;
	servers: Map<string, ServerInfo>;
}
