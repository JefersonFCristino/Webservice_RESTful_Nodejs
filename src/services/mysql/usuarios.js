/* UTILIZANDO A CONEXÃO PARA FAZER UMA QUERY */

const sha1 = require('sha1') // Com isso vamos criptografar nossas senhas

const usuarios = deps => {
    return  {

        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
        
                connection.query('SELECT id, email FROM usuarios', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar as usuários', reject)
                        return false // para não passar para o "resolve"
                    }
                    
                    resolve({ usuarios: results })
                })
            })
        },

        save: (email, password) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps 

                connection.query('INSERT INTO usuarios (email, password) VALUES (?, ?)', [email, sha1(password)], (error, results) => {
                    
                    if (error) {
                        errorHandler(error, `Falha ao salvar a categoria ${email}`, reject)
                        return false
                    }
                    
                    resolve({ usuario: { email, id: results.insertId } }) // último id inserido
                })
            })
        },

        update: (id, password) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps 

                // os parâmetros precisam ser passados na ordem certa. Neste caso, vamos permitir somente a atualização do "password"
                connection.query('UPDATE usuarios SET password = ? WHERE id = ?', [sha1(password), id], (error, results) => {
                    
                    if (error || !results.affectedRows) { // affectedRows = 0, ou seja, false
                        errorHandler(error, `Falha ao atualizar o usuário de id ${id}`, reject)
                        return false
                    }
                    
                    resolve({ usuario: { id }, affectedRows: results.affectedRows })
                })
            })
        },

        del: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps 

                connection.query('DELETE FROM usuarios WHERE id = ?', [id], (error, results) => {
                    
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Falha ao remover o usuário de id ${id}`, reject)
                        return false
                    }
                    
                    resolve({ message: 'Usuário removido com sucesso!', affectedRows: results.affectedRows})
                })
            })
        }
    }
}

module.exports = usuarios