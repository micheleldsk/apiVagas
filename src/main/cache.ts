import Redis from 'ioredis';
import { redisConfig } from './config/redis.config';

export class CacheConnection {
  private static _client?: Redis;

  public static get client(): Redis {
    if (!CacheConnection._client) throw new Error('Connection not initialized!');
    return CacheConnection._client;
  }

  static async connect(): Promise<void> {
    CacheConnection._client = redisConfig;
    await CacheConnection._client.connect();
  }

  static async disconnect(): Promise<void> {
    if (!CacheConnection._client) throw new Error('Connection not initialized!');
    await CacheConnection._client.disconnect();
    CacheConnection._client = undefined;
  }
};