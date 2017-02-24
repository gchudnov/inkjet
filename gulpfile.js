'use strict';

const babelSettings = require('./babel-settings.json');
require('babel-core/register')(babelSettings);

const requireDir = require('require-dir');

requireDir('./config', { recurse: true });
