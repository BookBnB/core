# BookBnB

[![Build Status](https://travis-ci.com/BookBnB/node-template.svg?branch=master)](https://travis-ci.com/BookBnB/node-template)
[![codecov](https://codecov.io/gh/BookBnB/core/branch/master/graph/badge.svg?token=3HYQW6VBPY)](undefined)
[![Heroku](https://heroku-badge.herokuapp.com/?app=bookbnb-master)](https://bookbnb-master.herokuapp.com/)

Servicio principal para BookBnB

## Run

Run:

```
npm run start
```

## Tests

```
npm run test			# all tests, no coverage
npm run test:unit		# unit tests only
npm run test:acceptance # accepatance test only
npm run test:coverage	# all tests, with coverage
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
