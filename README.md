# Pseudo Query Builder in NestJS with Prisma and ElasticSearch and SQLite

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:
  * Node.js (>= 14.x)
  * npm (>= 6.x)
  * SQLite (for database management)

## Installation process

```bash
$ npm install
```

### Add to .env file
```bash
DATABASE_URL="file:./dev.db"
```

### Migrate the DB structure

```bash
$ npx prisma migrate dev --name init
```

### Seed the database

```bash
./node_modules/.bin/ts-node seeder.ts
```

### Running the Application

```bash
npm run start:dev
```

## Example Queries
To test the query builder, you can make requests to the /users endpoint with various query parameters:

##### Users resource
  * GET /users - List all users
  * GET /users/:id - Get the user with :id
  * GET /users?name=johndoe
  * GET /users?email=johndoe@mail.com
  * GET /users?sortBy=name&orderBy=asc
  * GET /users?sortBy=name&orderBy=desc&withPosts
  * POST /users - create new user
  * PATCH /users/:id - update user
  * DELETE /users/:id - remove user

  Elastic query - this will just log the generated query
  * GET /users/search
  * GET /users/search?sortBy=name&orderBy=desc

##### Posts resource
  * GET /posts - List all posts
  * GET /posts/:id - Get the post with :id
  * GET /posts?title=myawesometitle
  * GET /posts?content=johndoe@mail.com
  * GET /posts?sortBy=title&orderBy=asc
  * GET /posts?sortBy=title&orderBy=desc&published=true/false&withAuthor
  * POST /posts - create new post
  * PATCH /posts/:id - update post
  * DELETE /posts/:id - remove post

  Elastic query - this will just log the generated query
  * GET /posts/search
  * GET /posts/search?sortBy=name&orderBy=desc

