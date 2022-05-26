# NestJs

Included: 
* Commands
* Swagger
* Decorators
* Guards
* MariaDB
* TypeORM
* Rest api
* GraphQL api
* RabbitMQ
* Tests
* DTOs
* Class-validator
* Class-transformer

How to start

````bash
git clone git@github.com:chomenko/nestjs.git
cd nestjs
docker-compose up
````

Server listing
* GraphQl [http://localhost:3000/graphql](http://localhost:3000/graphql)
* Swagger [http://localhost:3000/api/](http://localhost:3000/api/)

Run test
````bash
cd nestjs
docker-compose exec server bash -c "npm run test"
````

Create user witch command
````bash
cd nestjs
docker-compose exec server bash -c "npm run command user:create:admin <name> <password>"
````
