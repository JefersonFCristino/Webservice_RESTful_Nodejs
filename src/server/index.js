const restify = require('restify');
const server = restify.createServer(); // criando o server (onde temos get, post etc..)
const routes = require('../http/routes');
const cors = require('./cors');
const jwtMiddleware = require('./jwtMiddleware')

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser()) // aparentemente, o Restify já tem o BodyParser junto com ele

// Nós vamos passar para o middleware a informação das rotas que não devem passar pelo procedimento de verificação

const exclusions = ['/autenticacao', '/']

server.use(jwtMiddleware({ exclusions }))

routes(server); // vai chamar a função "routes" que está em outro arquivo (routes.js) que importamos no ('../http/routes') passando "server" como parâmetro lá no routes.js

module.exports = server;