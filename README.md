# Encurtador-de-url

## Instalação e Execução

Abrir terminal:

```sh
# Clone este repositório
git clone git@github.com:alefwhite/encurtador-de-url.git

# Copie as variáveis de ambiente do .env.example, crie o .env na raiz do projeto e cole 

# Caso opte por usar outro banco troque o provider no schema.prisma exemplo ("postgresql") e mude o DATABASE_URL do env
 
# Entre na pasta
cd encurtador-de-url

# Instale as dependências
npm install

# Execute as migration no sqlite
npm run migrate:dev

# Execute criação da tipagem do prisma
npm run prisma:generate

# Inicie o aplicativo
npm run dev

# Swagger
http://localhost:PORTA-DO-ENV/docs/
```

# Execução de Container com Aplicação Node.js usando Docker Compose
Este README descreve os passos necessários para executar um contêiner Docker contendo uma aplicação Node.js usando o Docker Compose.

Pré-requisitos
Certifique-se de ter o Docker e o Docker Compose instalados em seu sistema. Você pode baixá-los em docker.com.

Instalação e Execução
Clone este repositório para sua máquina local: git@github.com:alefwhite/encurtador-de-url.git

Bash
Copiar código
git clone git@github.com:alefwhite/encurtador-de-url.git
Navegue até o diretório do projeto:

bash
Copiar código
cd encurtador-de-url
Execute o Docker Compose para construir e iniciar o contêiner:

bash
Copiar código
docker-compose up -d
O argumento -d inicia os contêineres em segundo plano.

Acesse a aplicação em seu navegador:

Copiar código
http://localhost:3333
Parando e Removendo os Contêineres
Para parar a execução dos contêineres, utilize o comando:

bash
Copiar código
docker-compose down
Isso irá parar e remover os contêineres definidos no arquivo docker-compose.yml.
