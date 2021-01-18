# Travel App Project
### A Udacity Front End Web Developer Project
- - -

## Usage
A travel app that obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs.

## Project Overview
The project will include a simple form where you enter the location you are traveling to and the date you are leaving. If the trip is within a week, you will get the current weather forecast. If the trip is in the future, you will get a predicted forecast. The OpenWeather API is fantastic but it doesn’t let you get future data for free and it’s not that flexible with what information you enter; we are going to use the Weatherbit API for you to see how another API accomplishes the same goals. Weatherbit API has one problem, it only takes in coordinates for weather data -- it’s that specific. So, we’ll need to get those coordinates from the Geonames API. Once we have all of this data, we’ll want to display an image of the location entered; for this, we will be using the Pixabay API.

## Project Goals Summary
Create clean and appealing HTML/CSS. Targeting the DOM, working with objects, and retrieving data from 3 APIs in which one of those is reliant on another to work. Done in a Webpack environment, using an express server, and wrapped up with service workers.

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
### NPM Dependencies (see in package.json Dependencies section)
- webpack - bundles JavaScript files for usage in a browser, also transform, bundle, or package most resources or assets
- webpack-cli - provides a flexible set of commands for developers to increase speed when setting up a custom webpack project
- webpack-dev-server - creates development server that provides live reloading
- node-sass - natively compile .scss files to css
- body-parser - allows parsing incoming request bodies into a format (json object) useful for your program's handlers, available under the req.body property.
- cors - allows restricted resources to be requested from an outside domain (ex: ajax requests)
- dotenv - allows us to protect our API keys by loading them from an .env file 
- express - a web framework for node
- node-fetch - allows the use of fetch within node, allows use of window.fetch API without XMLHttpRequest. retrieve data from a URL without having to do a full page refresh, e.g. AJAX
- source-map - aids in debugging when webpack is in use. maps from the transformed source to the original source, enabling the browser to reconstruct the original source and present the reconstructed original in the debugger *configure in webpack.prod.js
- jest - unit testing, Environment: Test

### Webpack Dependencies (see in package.json DevDependencies section and webpack config js files)
#### All Environments
- babel - @babel/core, @babel/preset-env
- babel-loader - transpiles JavaScript files to supported JS version
- html-loader - stringifies html and sometimes image files (an alternative to html-webpack-plugin, need to turn of minify if using both) (consider replace with asset modules)
- file-loader - webpack image support (consider replace with asset modules)
- webpack-merge - allows use of common webpack config between prod and dev
- html-webpack-plugin - generates dist/index.html contains all webpack bundles in script tags
- output client library - access all code in files located in client/js via webpack client library

Note: Css-loader* and sass-loader* loaded in both environments' webpack.configs due to unique processing order with style-loader(dev) and MiniCssExtractPlugin.loader(prod) 

#### Development
- clean-webpack-plugin - keeps dev build clean by removing old unused files and assets after every successful rebuild 
- style-loader - injects CSS into the DOM
- sass-loader* - control dependency versions and dart v. node sass implemention
- css-loader* - interprets @import and url() like import/require()
- sourcemap - see listing above in NPM Dependencies

#### Production
- css-loader* - interprets @import and url() like import/require()
- sass-loader* - control dependency versions and dart v. node sass implemention
- mini-css-extract-plugin - creates a CSS file per JS file which contains CSS, support on demand loading/source maps
- optimize-css-assets-webpack-plugin - optimize \ minimize CSS assets using cssnano
- terser-webpack-plugin - minify Javascript
- workbox-webpack-plugin - service workers/offline processing