const Cache = require('./cache')

class InMemCache extends Cache {

  constructor(options) {
    super(options)
    this.cache = {}
  }

  get(key) {
    if (this.cache[key]) {
      return Promise.resolve(this.cache[key])
    }
    return Promise.resolve(null)
  }

  set(key, value, ttl) {
    this.cache[key] = value
    this._cleanup(key, ttl || this.options.ttl || 60000)
    return Promise.resolve()
  }

  _cleanup(key, timeout) {
    setTimeout(() => {
      delete this.cache[key]
    }, timeout)
  }
}

module.exports = InMemCache