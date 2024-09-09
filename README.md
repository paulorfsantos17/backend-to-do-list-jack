# Backend - TO-DO-LIST (JACK)

Este projeto backend faz parte da aplicação **TO-DO-LIST JACK** e foi construído utilizando o framework **NestJS**. O backend inclui autenticação JWT, integração com o banco de dados via Prisma ORM, validação de dados com Zod, além de testes unitários e end-to-end com Vitest.

## Tecnologias Utilizadas

### Frameworks e Ferramentas Principais

- **[NestJS](https://nestjs.com/):** Framework Node.js para a construção de aplicações escaláveis e eficientes, usando TypeScript por padrão.
- **[Prisma](https://www.prisma.io/):** ORM para facilitar o mapeamento de dados entre o banco de dados e a aplicação.
- **[Vitest](https://vitest.dev/):** Ferramenta rápida para execução de testes unitários e de cobertura.
- **[Zod](https://github.com/colinhacks/zod):** Biblioteca de validação de esquemas em TypeScript, usada para validação e tipagem dos dados.
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs):** Biblioteca de hashing utilizada para criptografar senhas.
- **[Passport](https://www.passportjs.org/):** Middleware para autenticação no Node.js, utilizado com a estratégia JWT.

## Como rodar o Back-End
 
  1. Clone o repositório:
   ```
    git clone https://github.com/paulorfsantos17/backend-to-do-list-jack.git
  ```
  2. Navegue até o diretório do projeto:
  ```
    cd backend-to-do-list-jack
  ``` 

  3. instale as dependências
  ```
    pnpm install
  ```

  4. Crie um banco de dados no docker usando o arquivo docker-compose.yml usando o comando:
  ```
    docker compose up -d 
   ``` 

  5. Gere as tabelas do banco de dados usando o comando do prisma: 
   ```
    pnpm prisma migrate dev 
   ``` 
  6. Antes de rodar a aplicação, configure as variáveis de ambiente do .env usando o .env.example como referência.

  7. Inicie o servidor de desenvolvimento:
  ```
    pnpm star:dev
  ```

  ## Explicação dos Scripts

  - **`start`:** Inicia o servidor em modo de produção.
  ```
    pnpm start
  ```

  - **`start:dev`:** Inicia o servidor em modo de desenvolvimento, com modo watch.
  ```
    pnpm start:dev
  ```


  - **`start:debug`:** Inicia o servidor em modo de debug
  ```
    pnpm start:debug
  ```

  - **`start:prod`:** Inicia o servidor diretamente a partir dos arquivos compilados na pasta dist.
  ```
   pnpm start:prod
  ```
  - **`lint`:** Executa o ESLint para encontrar e corrigir problemas no código.
  ```
    pnpm lint
  ```



  ## Teste unitários como usar: 

  Para executar os testes unitários, utilize os seguintes scripts:

   - **`test`:** Executa os testes unitários com Vitest.
  ```
   pnpm test
  ```
  - **`test:watch`:** Executa os testes unitários em modo de observação, para que sejam reexecutados a cada alteração no código.
  ```
   pnpm test:watch
  ```

  - **`test:cov`:** Executa os testes em modo de debug.
  ```
   pnpm test
  ```
  
  - **`test:debug`:** Executa os testes unitários e gera um relatório de cobertura de código.
  ```
   pnpm test:debug
  ```


  ## Test (e2e)

  Rodando teste unitário
  - **`test:e2e`:**  Executa os testes end-to-end usando a configuração do vitest.config.e2e.mts.
   ```
    pnpm test:e2e
   ```
  
  - **`test:e2e:watch`:** 
  ```
   pnpm test:e2e:watch
  ```
.


  ## Notas
  - Variáveis de Ambiente: Certifique-se de criar o arquivo .env com as variáveis necessárias, baseando-se no arquivo .env.example.
  - Testes: O projeto inclui testes unitários e testes end-to-end. Certifique-se de que todos os testes estão passando antes de fazer qualquer modificação significativa.
  - Os scripts test:e2e e test:e2e:ui executam automaticamente o script dev:test, que inicia o servidor de desenvolvimento do Vite em uma porta específica (50789) e no modo de teste. Isso é feito usando a configuração do Playwright definida no arquivo playwright.config.ts.