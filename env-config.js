const prod = process.env.NODE_ENV === 'production'

module.exports = {
  'process.env.BACKEND_URL': prod ? 'https://api.foodb.cf' : 'http://localhost:8080'
}