const test = require('ava')

const { connection, errorHandler } = require('./setup')

const categorias = require('../categorias')({ connection, errorHandler })

// Vamos definir um método para criar nosso resgistro, para usarmos ele nos nossos testes

const create = () => categorias.save('teste-categoria')

// Vamos garantir abaixo que a tabela sempre seja truncada

test.beforeEach(t => connection.query('TRUNCATE TABLE categorias')) // antes de qualquer teste nós vamos limpar a nossa tabela
test.after.always(t => connection.query('TRUNCATE TABLE categorias')) // e também vamos limpar a tabela depois dos testes serem executados (.always = queremos que isso aconteça mesmo que um teste falhe)

// test.serial = para rodar os testes um de cada vez, evitando assim que rodem todos ao mesmo tempo, paralelamente, causando problemas. (explicação pessoal = os 4 testes usam o "await create()", e se eles rodam ao mesmo, em paralelo, podemos ter problemas de testes conflitando entre si)

test.serial('Lista de categorias', async t => {
    await create()
    const list = await categorias.all()
    t.is(list.categorias.length, 1) // testando lista. Como sabemos que tem somente 1, o retorno do length também precisa ser 1
    t.is(list.categorias[0].name, 'teste-categoria')
})

test.serial('Criação de categoria', async t => {
    const result = await create()
    t.is(result.categoria.name, 'teste-categoria') // estamos usando nome "categoria" pois foi isso que definimos no resolve lá do save() = (resolve({ categoria: { name, id: results.insertId } }))
})

test.serial('Atualização de categoria', async t => {
    await create()
    const updated = await categorias.update(1, 'categoria-teste-updated') // 1 = com a criação do test.beforeEach e test.after.always sabemos que sempre vamos ter um id = 1
    t.is(updated.categoria.name, 'categoria-teste-updated')
    t.is(updated.affectedRows, 1) // lembresse que está funcionando porque TAMBÉM retornamos ele no resolve (olhar "categorias.js")
})

test.serial('Remoção de categoria', async t => {
    await create()
    const removed = await categorias.del(1)
    t.is(removed.affectedRows, 1)
})