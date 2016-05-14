'use strict';

const LineBot = require('line-bot-sdk');

module.exports = require('./lib');
module.exports.CommandType = require('./lib/constants/CommandType');
module.exports.MarkUp = LineBot.Markup;
module.exports.MultipleMessages = LineBot.MultipleMessages;
