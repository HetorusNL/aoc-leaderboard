# AoC Leaderboard

// TODO
Both the website and API are available as docker containers:

- https://hub.docker.com/r/hetorusnl/aoc-leaderboard-api
- https://hub.docker.com/r/hetorusnl/aoc-leaderboard-website

## API

The API uses python3 and flask to host the API server.
The API returns a (potentially empty) list of results in JSON format.
The current API endpoint can be reached at: https://api.aoc.hetorus.nl/.

### Running the API

Run the API using the docker container mentioned above.

### Example queries

_Make sure to change the `api.aoc.hetorus.nl` domain name when running the API locally_

// TODO

## Website

The website of AoC Leaderboard shows the results of the API calls to the API.
The current website is hosted at: https://aoc.hetorus.nl

### Running the website

Run the website using the docker container mentioned above.

### Configuring yarn

```bash
# make sure to install nodejs (e.g. `nodejs-lts-iron`) and npm

# if any of the below commands fail on permission errors, prefix them with sudo

# remove yarn is previously present on the system
sudo apt remove yarn

# make sure that node.js >= 16.10 is installed

# enable corepack
corepack enable

# init a new project
yarn init -2

# update to the latest version
yarn set version stable

# install the dependencies of the project
yarn install
```

## Scripts

### Run the development server

Run the following command to run the dev server:  
`yarn start`  
This starts the development server on `localhost:3000`

### Run a build (without incrementing version number)

Run the following command to build the application:  
`yarn build`  
This updates the version number (if changed in `package.json`) and builds the application

### Increment the version number of Vocya

The Semantic Versioning, also known as "semver", is used:  
Version: `major.minor.patch`  
Run one of the following commands:  
`yarn release-patch` // increments the `patch` number of the version  
`yarn release-minor` // increments the `minor` number of the version  
`yarn release-major` // increments the `major` number of the version

After these commands are executed, make sure to create a tag with matching version number (e.g. matching `v${npm_package_version}`), and push this to the repository, e.g:  
`git tag -a vX.Y.Z -m "vX.Y.Z"`  
`git push --tags`  
This causes the CI/CD to create a tagged docker image for both the API and the website with this version number.

## License

MIT License, Copyright (c) 2023 Tim Klein Nijenhuis <tim@hetorus.nl>
