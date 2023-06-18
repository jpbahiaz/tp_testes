# TP Teste de Software

## Integrantes do grupo

- Giuliano Penido de Paula Júnior   2018093074
- João Pedro Bahia Zica             2017023609
- João Victor de Souza Valgas       2019075711
- Luis Gabriel Caetano Diniz        2019075711                 
- Phillipe Lucas Santos Faria       2019054943
        

## Sobre o projeto

Foi desenvolvido uma solução de ponto eletrônico para gerenciamento de horas de trabalho, permitindo que usuários façam marcações dos 
horários em que iniciam e pausam suas atividades laborais. Diferentes usuários conseguem acessar o sistema por meio de uma interface
web e gerenciar individualmente seu horário de trabalho.
As funcionalidades implementadas são o registro de marcações de horário no dia atual e edição das dos dias anteriores.

## Detalhes de implementação
Todo o projeto (front e back-end) foi desenvolvido utilizando typescript em um monorepo com npm workspaces. 

### Front-end
Foi implementada uma single page application utilizando React como biblioteca de renderização, utilizando Zustand para gerenciamento de estado global
da aplicação, utilizando React Hook Form para gestão dos formulários. Para fazer o build da aplicação foi utilizado o Vite e o framework de testes Vitest.

### Back-end
Foi implementada uma API Rest utilizando a biblioteca Fastify para Node.js. A persistência dos dados foi realizada por meio de um banco relacional SQLite,
com a ajuda do ORM Prisma. 

## Instruções para executar o projeto

1. Clonar o repositório
2. Instalar node.js (Recomendado 16) e npm
3. Executar `npm install` na raíz do projeto
4. Executar `npm run dev -w server` para o rodar o back-end
5. Executar `npx prisma migrate reset` para rodar as migrations e preparar o banco de dados
6. Executar `npm run dev -w client` para o rodar o front-end


## Instruções para executar os testes

- Para rodar TODOS os testes, executar `npm run test`
- Para rodar somente os testes de back-end, executar `npm run test -w server`
- Para rodar somente os testes de front-end, executar `npm run test -w client`
- Para rodar os testes em uma interface gráfica, executar `npm run test.ui -w client (ou server)`
- Na interface gráfica, clicar no canto superior direito na pasta ao lado do play para visualizar a cobertura de testes
- Para rodar os testes de integração, executar `npm run test.integration`
