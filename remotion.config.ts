import { Config } from 'remotion';

Config.setCodec('h264');
Config.setLogLevel('info');
Config.setCrf(18);
Config.setEntryPoint('./src/index.tsx');
