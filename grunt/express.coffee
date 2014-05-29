module.exports =
  options:
    port: process.env.PORT || 8080
  dev:
    options:
      script: 'server/server.js'
      debug: true
  dist:
    options:
      script: 'dist/server/server.js'


