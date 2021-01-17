# Travel App Project
### A Udacity Front End Web Developer Project
- - -

## Usage
A travel app that obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs.


## Project Goals
1. Setting up Webpack
2. Sass styles
3. Webpack Loaders and Plugins
4. Creating layouts and page design
5. Service workers
6. Using APIs and creating requests to external URLs (use .env to keep API key secure)
7. Using Jest to Unit Test

## Project Prerequisites
- Webserver - Node
- Web application framework for routing - Express
- Build tool - Webpack. Using webpack, we will set up the app to have dev and prod environments, each with their own set of tools and commands.
- External script - Service Worker
- External APIs - [Geonames](http://www.geonames.org/export/web-services.html), [Weatherbit](https://www.weatherbit.io/account/create), and [Pixabay](https://pixabay.com/api/docs/)

## Dependencies
- babel-loader (transpiles JavaScript files to supported JS version, Environments: Dev, Prod))
- style-loader (Inject CSS into the DOM using html style tags, Environment: Dev)
- node-sass (natively compile .scss files to css, Environments: npm install, but do not list in Webpack config files)
- css-loader (interprets @import and url() like import/require(), Environments: Dev, Prod)
- sass-loader (control dependency versions and dart v. node sass implemention, Environments: Dev, Prod)
- clean-webpack-plugin (cleans up unused files from dist folder, Environment: Dev)
- html-webpack-plugin (generates dist/index.html contains all webpack bundles in script tags, Environments: Dev, Prod)
- mini-css-extract-plugin (creates a CSS file per JS file which contains CSS, support on demand loading/source maps, Environment: Prod)
- optimize-css-assets-webpack-plugin (optimize \ minimize CSS assets using cssnano, Environment: Prod)
- terser-webpack-plugin (minify Javascript - Environments:Prod)
- workbox-webpack-plugin (service workers/offline processing, Environment: Prod)
- jest (unit testing, Environment: Test)
- sourcemap (devtool for troubleshooting source files, Environment: Dev)
- output client library (access all code in files located in client/js via webpack client library , Environments: Dev, Prod)

