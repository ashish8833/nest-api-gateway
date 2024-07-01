import { registerAs } from '@nestjs/config';

export default registerAs('api-gateway', (): Record<string, any> => ({
    name: 'API-GATEWAY',
    port: process.env.API_GATE_WAY_PORT,
    globalPrefix: '/api',

}));