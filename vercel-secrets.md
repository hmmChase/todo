# vercel secrets

Fill in the info and run each line in your terminal in the project root

View secrets using `vercel secrets ls`

[Vercel env docs](https://vercel.com/docs/v2/build-step#environment-variables)

One Time:

1. Add `VERCEL_URL` to Environment Variables in the Vercel Project Settings dashboard

To add a new secret:

1. Add to `.env`
2. Add to `.env.example`
3. Add to `vercel.json`
4. Add to this list and run the command
   - Requires [Vercel CLI](https://vercel.com/download)

## Frontend

- `vercel secrets add access_token_secret <secret-value>`
- `vercel secrets add refresh_token_secret <secret-value>`

## Backend

- `vercel secrets add access_token_secret <secret-value>`
- `vercel secrets add refresh_token_secret <secret-value>`

### Prisma

- `vercel secrets add prisma_url <secret-value>`
- `vercel secrets add prisma_secret <secret-value>`

### Mailtrap

- `vercel secrets add mail_user <secret-value>`
- `vercel secrets add mail_pass <secret-value>`
