# next-graphql-starter

> An example CRUD PWA app with user authentification.

> View the app at https://next-graphql-starter.hmmchase.now.sh/

## Built with

- Next.js
- Styled Components
- Ant Design
- Apollo Client
- Apollo Server
- Prisma

## Features

- User sign up/in/out
- Create/Read/Update/Delete ideas
- Password resets
- Individual routes for ideas
- Progressive Web App
- Local GraphQL schema
- Normalize CSS
- Global CSS Theme
- Webpack Bundle Analyzer
- Accessibility auditing

## Testing

- This is a work-in-progress

### Authentication

- User authentication is implemented with a JWT cookie, handled by the Apollo server.
- The JWT is verified on the client, server-side, which sets a boolean in the local schema.
- A client query is then used to determine if a user is logged in for each page.

## Getting Started

### Clone project

`git clone https://github.com/hmmChase/next-graphql-starter.git`

### Install dependencies

1. Navigate to project root `cd next-graphql-starter`
2. Run `npm install`
3. Run `npm run frontend:install`
4. Run `npm run backend:install`

### Set environment variables

1. Locate `.env.example` in both `/frontend` and `/backend`
2. Make a copy of both
3. Rename copy to just `.env`

### Setup Prisma server

For simplicity's sake, we are using a demo server.

- First time
  - Visit [Prisma](https://www.prisma.io/) and sign up
  - Install [CLI](https://www.prisma.io/docs/prisma-cli-and-configuration/using-the-prisma-cli-alx4/) and login

1. Navigate to `/backend`
2. Run `npm run deploy -- -n`
3. Select `Demo server`
4. Complete the prompts
5. Copy `HTTP` endpoint
6. Paste endpoint in `.env` as `PRISMA_ENDPOINT` value
7. Run `npm run schema`
   - Do this everytime you make a change to `datamodel.prisma`

### Setup Mailtrap

Can skip if you don't try to reset a password.

- First time
  - Visit [Mailtrap](https://mailtrap.io) and sign up
  - Create demo inbox

1. Copy `Host`, `Port`, `Username`, and `Password` values
2. Paste in `/backend/.env`

### Start the app

1. Navigate to root `/`
2. Run `npm run app`
3. Visit `http://localhost:8008/`

### Deploy to Now

No guarantee this will work. Now has been changing a lot recently.

- First time
  - Visit [Now](https://zeit.co/now) and sign up
  - Install [Now Desktop](https://zeit.co/download) and login

1. Navigate to root `/`
2. Run `now`
3. Copy aliased URL
4. Paste URL in `/backend/.env` as `PROD_FRONTEND_URL` value
5. Paste URL in `/frontend/.env` as `PROD_GRAPHQL_ENDPOINT` value
   - append `/graphql` onto it
6. Follow `now-secrets.md` to setup Now secrets
7. Run `now`
8. Visit the URL
