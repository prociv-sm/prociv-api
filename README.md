<p align="center">
  <a href="https://github.com/prociv-sm/pcsm-api" target="blank"><img src="app_logo.png" width="500" alt="ProCiv API Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

<p align="center">
This project is a small service built with Nest.js dedicated to handling users, alerts, sectors, and other data for the Protezione Civile Nazionale alert systems.
</p>
<p align="center">
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@andreacw5/fileharbor" alt="NPM Version" /></a>
    <a href="https://github.com/prociv-sm/management-api/blob/main/LICENSE.md" target="_blank"><img alt="GitHub License" src="https://img.shields.io/github/license/andreacw5/fileharbor"></a>
</p>

## Features
- User management (CRUD)
- Alert management
- Sector and squad management
- Vehicle tracking
- Authentication (JWT)
- Health checks

## Getting Started
Follow these instructions to set up the project on your local machine for development and testing purposes.

1. **Clone the repository**
   ```bash
   git clone https://github.com/prociv-sm/management-api.git
   cd management-api
   ```
2. **Install dependencies**
   ```bash
   yarn install
   ```
3. **Configure environment variables**
   - Copy `.env.example` to `.env` and edit as needed.
   - Example:
     ```env
     PORT=3000
     DB_HOST=localhost
     DB_PORT=5432
     DB_USER=youruser
     DB_PASS=yourpass
     DB_NAME=yourdb
     JWT_SECRET=your_jwt_secret
     ```
4. **Start the application in development**
   ```bash
   yarn start:dev
   ```
5. **Access the API**
   Visit `http://localhost:3000` in your browser or use an API client (e.g. Postman).

## API Endpoints
Some main endpoints (see controllers for full details):
- `GET /v1/health` — Health check
- `POST /v1/auth/login` — Login
- `GET /v1/users` — List users
- `POST /v1/alerts` — Create alert
- `GET /v1/vehicles` — List vehicles

## Testing
Run tests with:
```bash
yarn test
yarn test:e2e
```

## Requirements
- [Node.js](https://nodejs.org/en/download/) 20 or higher
- [Yarn](https://yarnpkg.com/en/) 1.10.1 or higher

## Built With
- [Nest.js](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- [Docker](https://www.docker.com/) - Containerization platform

## Registry push
After releasing a new version, you need to push the new version to the registry.
> Access to the registry is required.
```bash
$ docker login registry.gitlab.com
$ docker build -t registry.gitlab.com/prociv-sm/management-api:<VERSION> .
$ docker push registry.gitlab.com/prociv-sm/management-api:<VERSION>
```

## Contributing
Contributions are welcome! If you want to contribute to this project, please follow these steps:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Support
For questions or issues, open an [issue](https://github.com/prociv-sm/management-api/issues) or contact the maintainers.

## Useful Links
- [Nest.js Documentation](https://docs.nestjs.com/)
- [Docker Documentation](https://docs.docker.com/)

## Environment Variables
| code                | description         | default value |
|---------------------|---------------------|---------------|
| APP_PORT            | App port            | 8080          |
| DATABASE_URL        | Database Url        |               |
| JWT_SECRET          | JWT Secret          |               |
| JWT_EXPIRATION_TIME | JWT Expiration time |               |

## Versioning
We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/andreacw5/url-manager-app/releases).

## Author
- [Andrea Tombolato](https://andreatombolato.dev)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details
