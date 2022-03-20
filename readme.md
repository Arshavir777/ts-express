# TS-express 
#TSssssssss


## Setup | Requirements

node version: >= 16 |
docker, docker-compose

# Start with docker
```
$ cp .env.example .env

(run app and mongo-DB)
$ docker-compose up

(run only app with dev mode)
$ docker-compose -f ./docker-compose.yaml -f docker-compose.dev.yaml up --no-deps  -d app
```

### Install dependencies.
```
$ npm i 
```

### Copy and update .env file for configurations.
```
$ cp .env.example .env
```

## Start
### Development
```
$ npm run dev
$ curl http://localhost:3000/ping
```

### Production
```
$ npm run build
$ npm run start
```