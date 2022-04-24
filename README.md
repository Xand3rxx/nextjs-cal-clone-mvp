# Cal.com(MVP Clone)

A Minimum Viable Product (MVP) of a scheduling tool like [https://cal.com](cal.com).

## Features

- Prisma
- NextAuth
- Tailwind CSS
- Jest
- ESlint
- Prettier
- Husky
- Lint-Staged
- Github Actions
- VSCode extensions

## Getting Started

1. Run `npm install` to install the required dev dependencies.

2. I have used a custom port, so run your server with `npm run dev` or `npm run dev -- -p 3330`.
   You can change to a port number of your choice by changing `"dev:" "next dev -p [your_port_number]"` the in the `package.json` file.

3. Open [http://localhost:3300](http://localhost:3330) with your browser to see the result.

4. You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

# Prisma Setup

1. Run `npx prisma init` to create your prisma schema in the prisma directory.

2. Set the `DATABASE_URL` in the `.env` file to point to your existing database. If your database has no tables yet, read [Getting started](https://pris.ly/d/getting-started).

3. Set the `NEXTAUTH_URL` in the `.env` file to point to your client side authentication path
   i.e

```
   DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
   NEXTAUTH_URL="http://localhost:3330/"
```

4. Set the `provider` of the `datasource` block in `schema.prisma` to match `postgresql` database.

5. Run `npx prisma db push` executes the changes required to make your database schema reflect the state of your Prisma schema.
   
6. Seed the database using `npx prisma db seed`.

7. Run `npx prisma studio` to use Prisma Studio's interface and modify the seeded `User` and `EventType` records(if need be).

8. Because Prisma Client is tailored to your own schema, you need to update it every time your Prisma schema file is changing by running the following command: `npx prisma generate`.

# Useful Prisma Commands

1. `npx prisma migrate dev` to run migrations.

2. `npx prisma studio` to open Prisma Studio in the browser.
