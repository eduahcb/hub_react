# Hub Frontend (React)

Pequeno projeto onde o usuário poderá cadastrar tecnologias e os seus respectivos níveis.

O que o usuário pode fazer:

- Se cadastrar
- Login/Logout
- Criar tecnologia e seu nível
- Deletar tecnologia
- Atualizar tecnologia e o seu nível

## Tecnologias

- [React](https://react.dev/)
- [Tanstack Query - React](https://tanstack.com/query/latest)
- [Tailwind](https://tailwindcss.com/)
- [Msw](https://mswjs.io/)
- [React Hook Form](https://react-hook-form.com/)
- [React Router](https://reactrouter.com/en/main)
- [Zod](https://zod.dev/)

## Como utilizar?

### Instalar dependencias

```bash
pnpm install
```

### Setar a variável de ambiente da api:

Copie o arquivo .env.example para o arquivo .env.local. Lembre de setar a url da api para a mesma porta que a aplicação, no caso `http:localhost:3000`

```bash
cp .env.example .env.local
```

### Iniciar projeto

```bash
pnpm dev
```

A aplicação irá iniciar na porta `3000`

## Rodar aplicação integrado com api com o Docker

### Setar a variável de ambiente da api:

Copie o arquivo .env.example para o arquivo .env.staging.local. Lembre de setar a url da api para uma outra diferente da aplicaçao

```bash
touch cp .env.example .env.staging.local
```

### Faça build da aplicação

rode o comando de build em staging:

```bash
pnpm build:stg
```

rode a aplicação:

```bash
pnpm preview
```

### Inicie a api pelo docker

rodar o comando do docker compose:

```bash
docker compose up
```

## Rodar testes

```bash
pnpm test
```

## Ver rotas da API

```bash
http://localhost:8080/api/v1/swagger/index.html
```
