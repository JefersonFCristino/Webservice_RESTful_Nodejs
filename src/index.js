// a tendência desse arquivo é que ele fique só com essas duas linhas. serve como arquivo de entrada do node e serve para rodar a aplicação

require('dotenv').config() // Aula 14 sobre ".env"

const server = require('./server');

server.listen('3456');

// fomos dentro dos scripts de package.json é criamos o "dev": "nodemon src/index.js", / com isso, podemos ir no terminal e executar o "npm run dev" para rodar nosso projeto. OBS: JÁ TEMOS O NODEMON INSTALADO DE FORMA GLOBAL NA MÁQUINA, por isso, não tivemos que baixar de novo.

// O nodemon só é usado na sua máquina, na maquina do desenvolvedor. Para manter no server temos uma solução muito mais robusta chamada "pm2" (veremos no final da série)