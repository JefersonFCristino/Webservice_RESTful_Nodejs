/* CRIANDO A CONEXÃO */

const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

const errorHandler = (error, msg, rejectFunction) => {
    console.error(error)
    rejectFunction({ error: msg }) // isso vai parar lá no "catch" de 'routes'. em vez de de passar o "reject" da Promise direto em "categorias.js" nós passamos para a errorHandler, tratamos e passamos para a resposta para "routes.js"
}

const categoriaModulo = require('./categorias')({ connection, errorHandler })
const usuariosModulo = require('./usuarios')({ connection, errorHandler })
const authModulo = require('./auth')({ connection, errorHandler })

module.exports = {
    categorias: () => categoriaModulo,
    usuarios: () => usuariosModulo,
    auth: () => authModulo
}