# Now secrets

Fill in the info and run each line in your terminal in the project root

View secrets using `now secrets ls`

[Now env docs](https://zeit.co/docs/v2/deployments/environment-variables-and-secrets/?query=secret#securing-environment-variables-using-secrets)

To add a new secret:

1. Add to `.env`
2. Add to `.env.example`
3. Add to `now.json`
4. Expose secrets to the client by adding them to `next.config.js`
   - [Expose secrets client side](https://www.leighhalliday.com/secrets-env-vars-nextjs-now)
5. Add to this list and run the command
   - Requires [Now CLI](https://zeit.co/download#now-cli)

## Frontend

- `now secrets add dev_graphql_url <secret-value>`
- `now secrets add prod_graphql_url <secret-value>`
- `now secrets add dev_refresh_url <secret-value>`
- `now secrets add prod_refresh_url <secret-value>`

## Backend

- `now secrets add port <secret-value>`
- `now secrets add access_token_secret <secret-value>`
- `now secrets add refresh_token_secret <secret-value>`
- `now secrets add dev_frontend_url <secret-value>`
- `now secrets add prod_frontend_url <secret-value>`

### Prisma

- `now secrets add prisma_url <secret-value>`
- `now secrets add prisma_secret <secret-value>`
- `now secrets add prisma_management_api_secret <secret-value>`

### Mailtrap

- `now secrets add mail_host <secret-value>`
- `now secrets add mail_port <secret-value>`
- `now secrets add mail_user <secret-value>`
- `now secrets add mail_pass <secret-value>`
