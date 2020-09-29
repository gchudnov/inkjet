'use strict';

require("@babel/register")({});

const { browserifyTask } = require('./scripts/browserify-task');

exports.default = browserifyTask;
