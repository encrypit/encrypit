# encrypit

[![build](https://github.com/encrypit/encrypit/actions/workflows/build.yml/badge.svg)](https://github.com/encrypit/encrypit/actions/workflows/build.yml)
[![cypress](https://github.com/encrypit/encrypit/actions/workflows/cypress.yml/badge.svg)](https://github.com/encrypit/encrypit/actions/workflows/cypress.yml)

Encrypit.

This project is built with:

- [MUI](https://mui.com/)
- [Vite](https://vitejs.dev/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

## Prerequisites

- [Node.js](https://nodejs.org/)
- [nvm](https://github.com/nvm-sh/nvm#readme)
- [Yarn 1](https://classic.yarnpkg.com/en/docs/install)

## Install

Clone the repository:

```sh
git clone https://github.com/encrypit/encrypit.git
cd encrypit
```

Use the project's Node.js version:

```sh
nvm use
```

Install the dependencies:

```sh
yarn
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the web app in the development mode.

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.

You will also see any errors in the console.

Alternatively, you can run the client and the server separately:

```sh
yarn client
```

```sh
yarn server
```

If the server exits without killing the app, then kill the process:

```sh
kill $(lsof -ti :8788)
```

### `yarn lint`

Runs ESLint.

### `yarn test`

Runs Jest tests.

### `yarn build`

Builds the web app for production to the `dist` folder.

It correctly bundles in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

## License

[MIT](LICENSE)
