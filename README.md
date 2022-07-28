# btc-rate-service

## Test task for Genesis & KMA Software Engineering School.

## Running with docker:

`docker build . -t brc_rate_service` (`btc_rate_service` can be replaced with any other image name)

`docker run -p 3000:3000 -d brc_rate_service`

(The container name can be set using the `--name` option in the docker run command.)

## Running without docker:

`npm install`

`nodemon app.ts`

