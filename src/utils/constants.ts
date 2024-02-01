import Struct from 'structron';

export const constants = {
	serverInfo: new Struct() // python struct: '<I H 100s x B B B c B 7s I H B B'
		.addMember(Struct.TYPES.UINT_LE, 'ip')
		.addMember(Struct.TYPES.USHORT, 'port')
		.addMember(Struct.TYPES.STRING(100, 'utf8'), 'name')
		.addMember(Struct.TYPES.SKIP(1), 'pad')
		.addMember(Struct.TYPES.BYTE, 'playersCount')
		.addMember(Struct.TYPES.BYTE, 'maxPlayers')
		.addMember(Struct.TYPES.BYTE, 'timeHour')
		.addMember(Struct.TYPES.BYTE, 'unknown1')
		.addMember(Struct.TYPES.BYTE, 'passwordByte')
		.addMember(Struct.TYPES.STRING(7, 'hex'), 'unknown2')
		.addMember(Struct.TYPES.UINT, 'versionBuild')
		.addMember(Struct.TYPES.USHORT, 'versionPatch')
		.addMember(Struct.TYPES.BYTE, 'versionMinor')
		.addMember(Struct.TYPES.BYTE, 'versionMajor'),

	masterServers: [
		{ host: '176.57.138.2', port: 1040 },
		{ host: '83.223.199.20', port: 1040 },
		{ host: '83.223.200.20', port: 1040 },
	],

} as const;
