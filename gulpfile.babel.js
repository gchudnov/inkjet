'use strict';

require("@babel/register")({});

const { browserifyTask } = require('./tasks/browserify-task');
const { bundleTestTask } = require('./tasks/bundle-test-task');

exports.default = browserifyTask;
exports.bundleTest = bundleTestTask;
