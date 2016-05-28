#!/usr/bin/env node

/**
 * Copyright 2016 Matthew Barry
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Botkit = require('botkit');
var lex = require('./lexer');
var program = require('commander');

var pkgConfig = require('./package.json');

program
  .version(pkgConfig.version)
  .option('-v, --verbose', 'Shows debugging information')
  .option('-k, --token <token>', 'Slack API Token')
  .parse(process.argv);

// fall back to environment variables for configuration
if (!program.token) {
  program.token = process.env.PARENSBOT_SLACK_API_TOKEN;
}

if (!program.token) {
  throw new Error('No Slack API token provided.');
}

// create a bot that will connect to the desired account
var controller = Botkit.slackbot();
var bot = controller.spawn({
  token: program.token
});

controller.on('rtm_open', () => program.verbose && console.log('connected to RTM'));
controller.on('rtm_close', () => program.verbose && console.log('disconnected from RTM'));

// start and connect the bot
bot.startRTM(function(err, bot, payload) {
  if (err) {
    throw new Error('Could not connect to Slack');
  }

  if (program.verbose) {
    console.log('verbose logging enabled');
  }
});

// listen for incoming messages
controller.on(["ambient", "direct_mention", "mention", "direct_message"], handleMessage);

/**
 * Handles an incoming slack message
 * @param {Botkit.Bot} bot
 * @param {Botkit.Message} message
 */
function handleMessage(bot, message) {
  // only handle messages with content
  if (!message.text) {
    return;
  }

  if (program.verbose) {
    console.log(`received message: ${message.text}`);
  }

  let unclosed = lex(message.text);
  if (unclosed.length > 0) {
    bot.reply(message, unclosed.join(''));
  }
}
