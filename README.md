# Northcoders News API

In order to create the necessary environment variables:

(1) install `dotenv` as a dev dependency using the following command:

```
npm i -D dotenv
```

(2) use the `.env-example` file to create two .env files for the project: `.env.test` and `.env.development`. The names of each database can be found in `/db/setup.sql`.

(3) double check that `.env.*` is added to the `.gitignore` so that each of the .env files are .gitignored.

(4) run `"setup-dbs"` script command in your terminal to drop/create each of test and development databases.
