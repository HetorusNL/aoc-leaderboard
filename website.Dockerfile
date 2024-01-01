FROM node:20-bookworm AS builder

# add the website files to the docker
COPY website/ /code

# build the project
RUN cd /code && \
    corepack enable && \
    yarn set version stable && \
    yarn install && \
    yarn build

# use the caddy image as base to host the website
FROM caddy

# add the built website to the caddy srv/ directory
COPY --from=builder /code/build /srv/website
# add the Caddyfile for the website
COPY gha/Caddyfile /etc/caddy/Caddyfile

# add/update the container labels
LABEL org.label-schema.vcs-ref=$VCS_REF
LABEL org.label-schema.vcs-url=https://github.com/HetorusNL/aoc-leaderboard
LABEL org.opencontainers.image.authors=tim@hetorus.nl
LABEL org.opencontainers.image.source=https://github.com/HetorusNL/aoc-leaderboard
LABEL org.opencontainers.image.description="Custom Leaderboard for the Private Advent of Code Leaderboards "
LABEL org.opencontainers.image.licenses=MIT
