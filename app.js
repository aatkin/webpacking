const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');

const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res) => {
  const htmlBuffer = devMiddleware.fileSystem.readFileSync(`${config.output.path}/index.html`);
  res.send(htmlBuffer.toString());
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});