# Webservice RESTful com Node.js, Restify e MySQL

Este é um projeto para estudo desenvolvido a partir da playlist de aulas do instrutor Fabio Vedovelli

# Recursos vistos:

  . Utilização do Restify
  
  . Utilização do MySQL
  
  . Criação de um CRUD (get, post, put e delete)
  
  . Uso de Promises e async/await
  
  . sha1 apara criptografar nossos passwords
  
  . JWT para cuidarmos da parte de autenticação
  
  . utilização do AVA para os nossos testes
  
  . .env
  
# Observações:

   . EXPLICAÇÃO PESSOAL: Como aparentemente "usuarios.test.js" e "auth.test.js" (que foi o arquivo anteriormente criado para fazer os testes de autenticação) estavam conflitando entre si (pelo meu entendimento e testes, por causa do "create()" do usuario, que estava presente nos 2 arquivos) a solução que eu obtive foi colocar os dois em um único arquivo para que os testes rodem todos certamente, de maneira serial e sem conflito entre si. O código originalmente criado para o arquvio "auth.test.js" pode ser visto comentado no final do arquivo "usuarios-auth.test.js
   
   . Foi ulizado o AVA na mesma versão apresentada na playlist.
