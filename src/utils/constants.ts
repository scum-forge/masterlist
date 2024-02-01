import { sizeOf } from 'python-struct';

const svInfoStructFormat = '<I H 100s x B B B c B 7s I H B B';

export const constants = {
	serverInfo: {
		format: svInfoStructFormat,
		size: sizeOf(svInfoStructFormat),
	},

	masterServers: [
		{ host: '176.57.138.2', port: 1040 },
		{ host: '83.223.199.20', port: 1040 },
		{ host: '83.223.200.20', port: 1040 },
	],

} as const;
