# Protezione civile Settimo Milanese
## Management API Module

## Installation
```bash
$ yarn install
```

## Running the app
```bash
# development
$ yarn run start:dev
```

## Registry push
After releasing a new version, you need to push the new version to the registry.
> Access to the registry is required.
```bash
$ docker login registry.gitlab.com
$ docker build -t registry.gitlab.com/prociv-sm/management-api:<VERSION> .
$ docker push registry.gitlab.com/prociv-sm/management-api:<VERSION>
```

## Stay in touch
- Author - [Andrea Tombolato](https://andreatombolato.dev)

## License

Nest is [MIT licensed](LICENSE).
