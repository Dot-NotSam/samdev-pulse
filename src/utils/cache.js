// TTL-based in-memory cache

/ Production cache TTL: 30 minutes (1800000ms)
// Development cache TTL: 5 minutes (300000ms)
const DEFAULT_CACHE_TTL = process.env.NODE_ENV === 'production' ? 1800000 : 300000;

class Cache {
  constructor(defaultTTL = DEFAULT_CACHE_TTL) {
    this.defaultTTL = defaultTTL;
    this.store = new Map();
  }

  /**
   * Get a value from cache
   * Returns null if not found or expired
   */
  get(key) {
    const entry = this.store.get(key);

    if (!entry) {
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }

    return entry.value;
  }

  /**
   * Set a value in cache with optional TTL
   */
  set(key, value, ttl = this.defaultTTL) {
    const expiresAt = Date.now() + ttl;
    this.store.set(key, { value, expiresAt });
  }

  /**
   * Check if key exists and is not expired
   */
  has(key) {
    return this.get(key) !== null;
  }

  /**
   * Delete a key from cache
   */
  delete(key) {
    this.store.delete(key);
  }

  /**
   * Clear all entries from cache
   */
  clear() {
    this.store.clear();
  }

  /**
   * Get cache size
   */
  size() {
    return this.store.size;
  }
}

// Singleton instance for GitHub data cache
export const githubCache = new Cache();

export default Cache;
