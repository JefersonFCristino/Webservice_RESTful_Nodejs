const corsMiddleware = require('restify-cors-middleware')
 
// Por enquanto vamos deixar aberto para todo mundo

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['*'],
  allowHeaders: ['*'],
  exposeHeaders: ['*']
})

module.exports = cors;