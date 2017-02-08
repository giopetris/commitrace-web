if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStord.prod')
} else {
  module.exports = require('./configureStore.dev')
}
