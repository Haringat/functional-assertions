FROM node:18-alpine as build

ARG REGISTRY_TOKEN

COPY package.json /src/package.json
COPY pnpm-lock.yaml /src/pnpm-lock.yaml

WORKDIR /src

RUN echo "registry=https://registry.npmjs.org/"$'\n'\
"@di-on-solutions:registry=https://npm.pkg.github.com/"$'\n'\
"//npm.pkg.github.com/:_authToken="${REGISTRY_TOKEN}$'\n'\
"always-auth=true" > .npmrc

RUN npx pnpm install

COPY gulpfile.mjs /src/gulpfile.mjs
COPY tsconfig.json /src/tsconfig.json
COPY tsconfig.lint.json /src/tsconfig.lint.json
COPY tslint.json /src/tslint.json
COPY README.md /src/README.md

COPY src /src/src

RUN npx gulp

FROM node:18-alpine

ARG REGISTRY_TOKEN

COPY --from=build /src/dist /app

WORKDIR /app

RUN echo "registry=https://registry.npmjs.org/"$'\n'\
"@di-on-solutions:registry=https://npm.pkg.github.com/"$'\n'\
"//npm.pkg.github.com/:_authToken="${REGISTRY_TOKEN}$'\n'\
"always-auth=true" > .npmrc

ARG BRANCH

RUN if test "${BRANCH}" = "master"; then npx pnpm publish; fi;

RUN rm -f .npmrc
