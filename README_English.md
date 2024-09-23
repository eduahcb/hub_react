# Hub Frontend (React)

Small Project where Users Can Register Technologies and Their Respective Levels

## What the User Can Do:

- Register
- Login/Logout
- Create a technology and its level
- Delete a technology
- Update a technology and its level

## Techs

- [React](https://react.dev/)
- [Tanstack Query - React](https://tanstack.com/query/latest)
- [Tailwind](https://tailwindcss.com/)
- [Msw](https://mswjs.io/)
- [React Hook Form](https://react-hook-form.com/)
- [React Router](https://reactrouter.com/en/main)
- [Zod](https://zod.dev/)

## How to use?

### Install Dependencies

```bash
pnpm install
```

### Set the API Environment Variable:

Copy the .env.example file to .env.local. Remember to set the API URL to the same port as the application, which is http://localhost:3000.

```bash
touch cp .env.example .env.local
```

### Start project

```bash
pnpm dev
```

The application will start on port `:3000`

## Run the Application Integrated with the API Using Docker

### Set the API Environment Variable:

Copy the `.env.example` file to `.env.staging.local`. Remember to set the API URL to a different one than the application.

```bash
touch cp .env.example .env.staging.local
```

### Build the Application

Run the build command in staging:

```bash
pnpm build:stg
```

Run the application:

```bash
pnpm preview
```

### Start the API with Docker

Run the Docker Compose command:

```bash
docker compose up
```

## Run the tests

```bash
pnpm test
```

## See API routes

```bash
http://localhost:8080/api/v1/swagger/index.html
```
