// No restify o next() sempre tem que ser executado para finalizar o processo da rota, se não a resposta nunca vai chegar ao destino final

const db = require('../services/mysql') // lembrete = automaticamente procura o arquivo 'index.js"

// ESTRUTURA DE CHAMADA DE MÉTODOS

// db.categorias().all()
// db.categorias().save(name)
// db.categorias().update(id, name)
// db.categorias().del(id)

const routes = (server) => {

    // ROTAS DE AUTENTICAÇÃO (para geração de um jwt válido que vai permitir o acesso as rotas de "categoria" e "usuarios")

    server.post('/autenticacao', async (req, res, next) => {

        try {
            const { email, password } = req.params
            res.send(await db.auth().authenticate(email, password)) // retorna um token (que deverá ser usado para permitir o acesso das rotas)
        
        } catch (error) {
            res.send(error)
        }

        next()
     })

    // ROTAS DE CATEGORIA

    server.get('/categoria', async (req, res, next) => {

        try {
            res.send(await db.categorias().all())
        
        } catch (error) {
            res.send(error)
        }

        next()
     })

    server.post('/categoria', async (req, res, next) => {
        const { name } = req.params

        try {
            res.send(await db.categorias().save(name))
        
        } catch (error) {
            res.send(error)
        }

        next()
    })

    server.put('/categoria', async (req, res, next) => {
        const { id, name } = req.params

        try {
            res.send(await db.categorias().update(id, name))
        
        } catch (error) {
            res.send(error)
        }

        next()
    })

    server.del('/categoria', async (req, res, next) => {
        const { id } = req.params

        try {
            res.send(await db.categorias().del(id))
        
        } catch (error) {
            res.send(error)
        }

        next()
    })

    // ROTAS DE USUÁRIOS

    server.get('/usuarios', async (req, res, next) => {

        try {
            res.send(await db.usuarios().all())
        
        } catch (error) {
            res.send(error)
        }

        next()
     })

    server.post('/usuarios', async (req, res, next) => {
        const { email, password } = req.params

        try {
            res.send(await db.usuarios().save(email, password))
        
        } catch (error) {
            res.send(error)
        }

        next()
    })

    server.put('/usuarios', async (req, res, next) => {
        const { id, password } = req.params

        try {
            res.send(await db.usuarios().update(id, password))
        
        } catch (error) {
            res.send(error)
        }

        next()
    })

    server.del('/usuarios', async (req, res, next) => {
        const { id } = req.params

        try {
            res.send(await db.usuarios().del(id))
        
        } catch (error) {
            res.send(error)
        }

        next()
    })

    server.get('/', (req, res, next) => {
        res.send('Enjoy the silence...')
        next()
    })
}

module.exports = routes // exportando a FUNÇÃO "routes" para que ela fique disponível/visível em outros módulos/arquivos