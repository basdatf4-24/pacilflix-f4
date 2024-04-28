### Branch Name

feat/[feature], example feat/authentication

### How to start

#### Make sure you have latest nodejs version

**NODEJS 22**

(https://nodejs.org/en/download)[https://nodejs.org/en/download]

```shellscript
npm install
```

#### Create .env files

```.env
SESSION_SECRET='ofu8OtCRlacMMg=='
```

## Development

Run the Vite dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`
