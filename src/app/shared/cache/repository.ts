import Redis from 'ioredis';
import { CacheConnection } from '../../../main/cache';

export class CacheRepository {
  private cache: Redis;

  constructor() {
    this.cache = CacheConnection.client;
  }

  async set(key: string, value: Object | string, ttlSeconds?: number): Promise<void> {
    const valueToStore = typeof value === 'object'
      ? JSON.stringify(value)
      : value;

    if (ttlSeconds) {
      await this.cache.set(key, valueToStore, 'EX', ttlSeconds)
      return;
    };
    await this.cache.set(key, valueToStore)
  }

  async get(key: string): Promise<Object | string | null> {
    const value = await this.cache.get(key);
    if (value !== null && (value[0] === '{' || value[0] === '[')) {
      return JSON.parse(value);
    }
    return value;
  }

  async invalidate(key: string): Promise<void> {
    await this.cache.del(key);
  }

  async setObj(key: string, value: Object): Promise<void> {
    await this.cache.hset(key, value);
  }

  async getObj(key: string): Promise<any> {
    return this.cache.hgetall(key);
  }

  async getObjField(key: string, field: string): Promise<any> {
    return this.cache.hget(key, field);
  }
}