<!-- markdownlint-disable no-duplicate-header -->

# hmmStart

*An app head start!*

## Install

### FRONTEND

1. `cd hmmStart/frontend`

2. `npm i`

3. Create `.env` file from `env.example`

### BACKEND

1. `cd hmmStart/backend`

2. `npm i`

3. Create `.env` file from `env.example`

4. `npm run prisma:generate`

5. Set up Prisma
   - Set the `DATABASE_URL` in the `.env` file to point to your existing database.
     - If your database has no tables yet, read <https://pris.ly/d/getting-started>

   - Run `prisma db pull` to turn your database schema into a Prisma schema.

   - Run `prisma generate` to generate the Prisma Client.
     - You can then start querying your database.

## Deploy to Vercel

### FRONTEND

1. On dashboard, click `New Project`
2. Select the git repository of the app
3. Enter:
   - project name: `(name)-frontend`
   - framework preset: `Next.js`
   - root directory: `frontend`
   - environment variables:
      - `ACCESS_TOKEN_SECRET`
4. Deploy

### BACKEND

1. On dashboard, click `New Project`
2. Select the git repository of the app
3. Enter:
   - project name: `(app name)-backend`
   - framework preset: `other`
   - root directory: `backend`
   - environment variables:
     - `DATABASE_URL`
     - `ACCESS_TOKEN_SECRET`
4. Deploy
