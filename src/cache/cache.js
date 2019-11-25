const NotImplementedError = require('../errors/not-implemented')

/**
 * The purpose of this class is to serve as a blueprint for future cache
 * implementations. Eventually, we will move to Redis, so this will make 
 * switching painless.
 */
class Cache {
  constructor(options) {
    this.options = options
  }

  /**
   * For caches that need time to establish an external connection.
   */
  initialize() {
    return Promise.resolve()
  }

  /**
   * Tries to get a value from the cache.
   * @param {String} key The key used to fetch a value.
   * @returns {Promise<Object|null>} The object from the cache, or null. 
   */
  get(key) {
    throw new NotImplementedError('Cache.get')
  }

  /**
   * Stores a value in the cache, with an optional time to live for it.
   * If no ttl is specified, a default ttl is applied.
   * @param {String} key The key used to set value.
   * @param {Object|String} value The value to store in the cache.
   * @param {Number} [ttl] The time to live for the key, value combo.
   * @returns {Promise} Resolves if successful, fails otherwise.
   */
  set(key, value, ttl) {
    throw new NotImplementedError('Cache.set')
  }
}

module.exports = Cache