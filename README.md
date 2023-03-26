# chicken_crud

A basic CRUD app.

Made with this boilerplate: https://github.com/LandazuriPaul/nest-react

Features a super basic frontend for demonstration purposes.

## To use:

In the root directory, install via yarn

```
yarn install
```

Then just run everything as dev.

```
cd packages/client && yarn start:dev --host
cd packages/server && yarn start:dev
```

Client is exposed on `localhost:8000`, server on `localhost:4000` by default

To get a visualisation of the database, do:

```
cd packages/server && yarn prisma studio
```

Then open `localhost:5555`

To view documentation (via Swagger)

```
localhost:4000/api
```
