const test = require('ava')

const { connection, errorHandler } = require('./setup')

const usuarios = require('../usuarios')({ connection, errorHandler })

// Vamos definir um método para criar nosso usuário, para usarmos ele nos nossos testes

const create = () => usuarios.save('teste@usuario.com', '123456')

// Vamos garantir abaixo que a tabela sempre seja truncada

test.beforeEach(t => connection.query('TRUNCATE TABLE usuarios'))
test.after.always(t => connection.query('TRUNCATE TABLE usuarios'))

// ÁREA DE TESTE DE USUÁRIO

    test.serial('Lista de usuarios', async t => {
        await create()
        const list = await usuarios.all()
        t.is(list.usuarios.length, 1) // testando lista. Como sabemos que tem somente 1, o retorno do length também precisa ser 1
        t.is(list.usuarios[0].email, 'teste@usuario.com')
    })

    test.serial('Criação de usuario', async t => {
        const result = await create()
        t.is(result.usuario.email, 'teste@usuario.com') // estamos usando nome "usuario" pois foi isso que definimos no resolve lá do save() = (resolve({ usuario: { name, id: results.insertId } }))
    })
    
    test.serial('Atualização de usuario', async t => {
        await create()
        const updated = await usuarios.update(1, '123456789') 
         t.is(updated.affectedRows, 1) // lembresse que está funcionando porque TAMBÉM retornamos ele no resolve (olhar "usuarios.js")
    })
    
    test.serial('Remoção de usuario', async t => {
        await create()
        const removed = await usuarios.del(1) 
        t.is(removed.affectedRows, 1)
    })

/* AVISO - EXPLICAÇÃO PESSOAL: Como aparentemente "usuarios.test.js" e "auth.test.js" (que foi o arquivo anteriormente criado para fazer os testes de autenticação) estavam conflitando entre si (pelo meu entendimento e testes, por causa do "create()" do usuario, que estava presente nos 2 arquivos) a solução que eu obtive foi colocar os dois em um único arquivo para que os testes rodem todos certamente, de maneira serial e sem conflito entre si */

// ÁREA DE TESTE DE AUTENTICAÇÃO

    const auth = require('../auth')({ connection, errorHandler })
    
    test.serial('Login de usuário - sucesso', async t => {
        await create()
        const result = await auth.authenticate('teste@usuario.com', '123456') // a ação de login vai retornar um token
    
        t.not(result.token, null) // determinando que o token não é nulo
        t.not(result.token.length, 0) // também não a quantidade não pode ser igual a 0
    })

    test.serial('Login de usuário - falha', async t => {
        await create()
        const promise = auth.authenticate('teste2@usuario.com', '123456') // vamos retirar o "await" pois com ele o resultado seria o que for retornado pelo "resolve" (neste caso, o token), sem ele, o que será retornado é a promise, o que vai permitir usar dentro do teste o método "throws()"

        const error = await t.throws(promise) // o "throws" neste caso serve para capturar o reject da Promise

        t.is(error.error, 'Falha ao localizar o usuário') // exatamente a msg que definimos no reject no "auth.js"
    })

/* ABAIXO CONTÉM O CÓDIGO ANTERIORMENTE CRIADO PARA "aurh.test.js" */

// const test = require('ava')

// const { connection, errorHandler } = require('./setup')

// const usuarios = require('../usuarios')({ connection, errorHandler })
// const auth = require('../auth')({ connection, errorHandler })

// const create = () => usuarios.save('teste@usuario.com', '123456')

// test.beforeEach(t => connection.query('TRUNCATE TABLE usuarios')) 
// test.after.always(t => connection.query('TRUNCATE TABLE usuarios')) 

// test.serial('Login de usuário - sucesso', async t => {
//     await create()
//     const result = await auth.authenticate('teste@usuario.com', '123456') // a ação de login vai retornar um token

//     t.not(result.token, null) // determinando que o token não é nulo
//     t.not(result.token.length, 0) // também não a quantidade não pode ser igual a 0
// })