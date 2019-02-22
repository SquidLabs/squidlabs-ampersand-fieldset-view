module.exports = function (config) {
  config.set({
    basePath: '',
    plugins: [
      require('karma-browserify'),
      require('karma-tap'),
      require('karma-tap-pretty-reporter'),
      require('karma-chrome-launcher'),
      //require('karma-jsdom-launcher')
    ],
    frameworks: ['browserify', 'tap'],
    files: [
      'test/*.js'
    ],
    preprocessors: {
      'test/*.js': ['browserify']
    },
    autoWatch: true,
    reporters: ['tap-pretty'],
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['Chrome'],
    singleRun: process.env.CONTINUOUS_INTEGRATION === 'true'
  });
};