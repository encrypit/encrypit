<div align="center">
  <a href="https://encrypit.com/">
    <img src="public/logo192.png" alt="Encrypit">
  </a>
  <p><strong>Securely encrypt and decrypt files.</strong></p>
  <p>
    <a href="https://github.com/encrypit/encrypit/releases">
      <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/encrypit/encrypit">
    </a>
    <a href="https://github.com/encrypit/encrypit/actions/workflows/build.yml">
      <img src="https://github.com/encrypit/encrypit/actions/workflows/build.yml/badge.svg" alt="Encrypit build status badge">
    </a>
    <a href="https://codecov.io/gh/encrypit/encrypit"> 
      <img src="https://codecov.io/gh/encrypit/encrypit/branch/master/graph/badge.svg?token=MV6HXPJZJO"> 
    </a>
  </p>
</div>

## Try It

Go to [encrypit.com](https://encrypit.com/) to securely encrypt and decrypt files.

This project is built with:

- [Cloudflare Pages](https://pages.cloudflare.com/)
- [MUI](https://mui.com/)
- [Vite](https://vitejs.dev/)
- [react-dropzone](https://react-dropzone.js.org/)
- [zip.js](https://gildas-lormeau.github.io/zip.js/)

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

## Assets

[Logo](https://excalidraw.com/#json=0kNWq9d1BePagMI-_WJow,4W5vCTYSSJFF_mJC9NHtzA)

## License

[MIT](LICENSE)
