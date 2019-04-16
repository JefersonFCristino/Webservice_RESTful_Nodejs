/* UTILIZANDO A CONEXÃO PARA FAZER UMA QUERY */

const categorias = deps => {
    return  {

        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps // estamos extraindo a partir das deps que estão sendo passadas lá no "index.js" da pasta 'mysql'
        
                // o 1º parâmetro é a query em si e o 2º parâmetro pode ser ou um array ou um método (um método de callback)
                connection.query('SELECT * FROM categorias', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar as categorias', reject)
                        return false // para não passar para o "resolve"
                    }
                    
                    resolve({ categorias: results })
                })
            })
        },

        save: (name) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps 

                connection.query('INSERT INTO categorias (name) VALUES (?)', [name], (error, results) => {
                    
                    if (error) {
                        errorHandler(error, `Falha ao salvar a categoria ${name}`, reject)
                        return false
                    }
                    
                    resolve({ categoria: { name, id: results.insertId } }) // último id inserido
                })
            })
        },

        update: (id, name) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps 

                // os parâmetros precisam ser passados na ordem certa
                connection.query('UPDATE categorias SET name = ? WHERE id = ?', [name, id], (error, results) => {
                    
                    if (error || !results.affectedRows) { // affectedRows = 0, ou seja, false
                        errorHandler(error, `Falha ao atualizar a categoria ${name}`, reject)
                        return false
                    }
                    
                    resolve({ categoria: { name, id }, affectedRows: results.affectedRows })
                })
            })
        },

        del: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps 

                connection.query('DELETE FROM categorias WHERE id = ?', [id], (error, results) => {
                    
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Falha ao remover a categoria de id ${id}`, reject)
                        return false
                    }
                    
                    resolve({ message: 'Categoria removida com sucesso!', affectedRows: results.affectedRows})
                })
            })
        }
    }
}

module.exports = categorias