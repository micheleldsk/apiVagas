import hash from 'object-hash';
import { CacheRepository } from './repository';

let cacheKeysByPrefix: {[key: string]: string[]} = {};

export const executeIfNotCached = async (cacheKey: string, cacheRepository: CacheRepository, fn: Function) => {
  console.log('[cache] searching for cache:', cacheKey);
  const cachedResult = await cacheRepository.get(cacheKey);
  if (cachedResult) {
    console.log('[cache] cache hit for:', cacheKey);
    return cachedResult
  };
  console.log('[cache] cache missed for:', cacheKey);

  const result = await fn();
  await cacheRepository.set(cacheKey, result, 10);
  console.log('[cache] cache set for:', cacheKey);

  return result;
}

export const cacheKeyForObject = (prefix: string, object: Object): string => {
  const hashed = hash(object);
  cacheKeysByPrefix = {
    ...cacheKeysByPrefix,
    [prefix]: [...(cacheKeysByPrefix[prefix] || []), hashed]
  }
  return `${prefix}-${hashed}`;
}

export const invalidateCacheByPrefix = async (prefix: string, cacheRepository: CacheRepository) => {
  const keysToInvalidate = cacheKeysByPrefix[prefix].map((hashed) => `${prefix}-${hashed}`);
  console.log('[cache] invalidating cache for ', keysToInvalidate.join(','));
  const invalidatePromises = keysToInvalidate.map((key) => cacheRepository.invalidate(key));
  await Promise.all(invalidatePromises);
  console.log('[cache] invalidated cache for ', keysToInvalidate.join(','));
}