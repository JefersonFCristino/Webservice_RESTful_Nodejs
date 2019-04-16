// Configuração do Banco de Dados para teste! Conexão usada em "categorias.test.js" e "usuarios-auth.test.js" (usando o banco "restful_ws_test" e não original)

require('dotenv').config()

const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD, 
    database: process.env.MYSQL_TEST_DATABASE // banco de dados idêntico ao orginal que criamos para testes
})

const errorHandler = (error, msg, rejectFunction) => {
    console.error(error)
    rejectFunction({ error: msg })
}

module.exports = { connection, errorHandler }