# BookBnB

[![Build Status](https://travis-ci.com/BookBnB/core.svg?branch=master)](https://travis-ci.com/BookBnB/core)
[![codecov](https://codecov.io/gh/BookBnB/core/branch/master/graph/badge.svg?token=3HYQW6VBPY)](https://codecov.io/gh/BookBnB/core)
[![Heroku](https://img.shields.io/badge/heroku-master-success.svg?l?style=flat&logo=heroku&logoColor=white&labelColor=494998)](https://bookbnb-master.herokuapp.com/)
[![Heroku](https://img.shields.io/badge/heroku-develop-success.svg?l?style=flat&logo=heroku&logoColor=white&labelColor=494998)](https://bookbnb-develop.herokuapp.com/)


Servicio principal para BookBnB.

## Run

Run:

```
npm run start
```

## Tests

```
npm run test            # all tests, no coverage
npm run test:unit       # unit tests only
npm run test:acceptance # acceptance tests only
npm run test:coverag    # all tests, with coverage
```

## Migrations

Create migration file:

```
npm run migration:create <name>
```

E.g:

```
npm run migration:create CreateUsersTable
```

Run migrations:

```
npm run migration:run
npm run migration:revert
```

## Api docs

Se expone la especificación OpenApi en [localhost:3000/v1/api.json](http://localhost:3000/v1/api.json) y la ui swagger en [localhost:3000/v1/api-docs](http://localhost:3000/v1/api-docs/).

## Docker

Iniciar la app en desarrollo:

```
docker-compose up -d
```

Crear imagen con tag 'bookbnb':

```
docker/build_production_image.sh
```

Luego se puede iniciar la app en produccion:

```
docker/prod.sh up -d
```
