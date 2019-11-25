const ExtendError = require('./extend-error')

class NotImplementedError extends ExtendError {
  constructor(func) {
    super(`${func} is not implemented.`)
  }
}

module.exports = NotImplementedError