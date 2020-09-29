'use strict';

require("@babel/register")({});

const { browserifyTask } = require('./tasks/browserify-task');

exports.default = browserifyTask;
