# AoC Leaderboard

AoC Leaderboard to view the private Advent of Code leaderboards.

Both an API and a website is available. The API to query https://adventofcode.com for private leaderboard information, and the website to show the information for the private leaderboards.

Both the API and website are available as docker containers:

- https://hub.docker.com/r/hetorusnl/aoc-leaderboard-api
- https://hub.docker.com/r/hetorusnl/aoc-leaderboard-website

## API

The API uses python3 and flask to host the API server.
The API returns a (potentially empty) list of results in JSON format.
The current API endpoint can be reached at: https://api.aoc.hetorus.nl/.

### Running the API

Run the API using the docker container mentioned above.
As the AoC API is passing the requests to the https://adventofcode.com website, a session token must be specified to use the AoC API.
This session token can be extracted from the request header of requests made to https://adventofcode.com.
The information is stored in the Cookie header and has the form of session='token'.
The API docker image expects 'session' to be present in the environment with 'token' as value

### Example queries

_Make sure to change the `api.aoc.hetorus.nl` domain name when running the API locally_

The API exposes the endpoint: `/<edition>/<leaderboard>`.  
Substitute `<edition>` with the year to request the leaderboard for.  
And substitute `<leaderboard>` with the number of the private leaderboard to request.

## Website

The website of AoC Leaderboard shows the results of the API calls to the API.
The current website is hosted at: https://aoc.hetorus.nl

### Running the website

Run the website using the docker container mentioned above.

### Configuring npm

```bash
# install the dependencies of the project
npm install
```

## Scripts

### Run the development server

Run the following command to run the dev server:  
`npm run dev`  
This starts the development server on `localhost:5173`

### Run a build (without incrementing version number)

Run the following command to build the application:  
`npm run build`  
This updates the version number (if changed in `package.json`) and builds the application

### Increment the version number of the website

the Semantic Versioning, also known as "semver", is used:  
version: `major.minor.patch`  
run one of the following commands:  
`npm run release-patch` // increments the `patch` number of the version  
`npm run release-minor` // increments the `minor` number of the version  
`npm run release-major` // increments the `major` number of the version  
all these three commands also create a git commit and git tag with the major.minor.patch version number, and runs the build to create a production build, and add the changes (in e.g. meta.json version number) to the last version commit.  
these three commands also mention how to perform a push to the master branch on github and push the tags

## License

MIT License, Copyright (c) 2026 Tim Klein Nijenhuis <tim@hetorus.nl>
