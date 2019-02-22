//process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({
    basePath: '',
    plugins: [
      //'karma-browserify',
      'karma-chrome-launcher',
      'karma-spec-reporter',
      'karma-tape'
    ],
    frameworks: [ 'tape'],//'browserify',
    files: [
      'test/main.js'
    ],
    /*preprocessors: {
      'test/*.js': ['browserify']
    },*/
    autoWatch: false,
    reporters: ['spec'],
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['Chrome'],
    singleRun: true
  });
};