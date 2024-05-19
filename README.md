### Branch Name

feat/[feature], example feat/authentication

### How to start

#### Make sure you have latest nodejs version

**NODEJS 22**

(https://nodejs.org/en/download)[https://nodejs.org/en/download]

### Make sure you already installed bun

(https://bun.sh/)[https://bun.sh/]

### Install depedency

```shellscript
bun install
```

* you have to use bun or instead installation dependency or error

alternative:
- pnpm
- yarn
  

#### Create .env 

Referes to `env.example`

```.env
SESSION_SECRET='ofu8OtCRlacMMg=='
DATABASE_URL=``
```

## Development

Run the Vite dev server:

```sh
bun run dev
```

## Deployment

First, build your app for production:

```sh
bun run build
```

Then run the app in production mode:

```sh
bun run  start
```

### Deployment

[https://pacilflix-f4.fly.dev/](https://pacilflix-f4.fly.dev/)
