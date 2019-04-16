const jwt = require('jsonwebtoken')

// Para proteger uma ou mais rotas precisamos criar um middleware. Como explicado pelo Vedovelli, o "use" está entre a chamada da requisição e os métodos que vão executá-las

const jwtMiddleware = (deps) => {
    
    return async (req, res, next) => {
        // nós temos acesso da rota que foi acessada atarvés do "req.href"

        if (!deps.exclusions.includes(req.href())) {
            const token = req.headers['x-access-token']
    
            if (!token) {
                res.send(403, { error: 'Token não fornecido' })
                return false
            }
    
            // verificação do token. decoded = jwt decodificado, com todas as informações que colocamos dentro dele

            try {
                req.decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            } catch (error) {
                res.send(403, { error: 'Falha ao autenticar o token' })
                return false
            }
        }

        next()
    }
}

module.exports = jwtMiddleware