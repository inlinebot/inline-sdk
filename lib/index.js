'use strict';

const _ = require('lodash');
const debugOnCommand = require('debug')('inline:onCommand');
const LineBot = require('line-bot-sdk');
const spinal = require('./spinal');

function InlineSDK() {
  this.contextId = null;
};

InlineSDK.prototype.onCommand = (callback) => {
  spinal.provide('command', ((data, res) => {
    this.contextId = data.contextId;
    callback(data.type, data.payload);
    res.send({ success: true });
  }).bind(this));

  spinal.start(function() {
    debugOnCommand('Spinal node is started with namespace ' + this.namespace);
  });
};

InlineSDK.prototype.getContextId = () => {
  return this.contextId;
};

InlineSDK.prototype.getWebhookUrl = () => {
  return (process.env.INLINE_WEBHOOK_BASE_URL || '') + this.contextId;
};

InlineSDK.prototype.getData = (key, callback) => {
  if (!key) throw new Error('Key must not be empty');


  const data = {
    contextId: this.contextId,
    key: key
  };

  spinal.call('inline.getData', data, (err, result) => {
    if (err) {
      callback(err);
      return;
    }

    callback(null, {
      key: result.key,
      value: result.value
    });
  });
};

InlineSDK.prototype.setData = (key, value, callback) => {
  if (!key) throw new Error('Key must not be empty');
  if (!_(callback).isFunction()) throw new Error('Callback must be a function');

  const data = {
    contextId: this.contextId,
    key: key,
    value: value
  };

  spinal.call('inline.setData', data, callback);
};

InlineSDK.prototype.sendText = (text, callback) => {
  const data = {
    contextId: this.contextId,
    text: _(text).toString()
  };

  spinal.call('inline.sendText', data, callback || () => {});
};

InlineSDK.prototype.sendImage = (imageUrl, previewImageUrl, callback) => {
  const data = {
    contextId: this.contextId,
    imageUrl: _(imageUrl).toString(),
    previewImageUrl: _(previewImageUrl).toString()
  };

  spinal.call('inline.sendImage', data, callback || () => {});
};

InlineSDK.prototype.sendVideo = (videoUrl, previewImageUrl, callback) => {
  const data = {
    contextId: this.contextId,
    videoUrl: _(videoUrl).toString(),
    previewImageUrl: _(previewImageUrl).toString()
  };

  spinal.call('inline.sendVideo', data, callback || () => {});
};

InlineSDK.prototype.sendAudio = (audioUrl, durationMillis, callback) => {
  const data = {
    contextId: this.contextId,
    audioUrl: _(audioUrl).toString(),
    durationMillis: _(durationMillis).toInteger()
  };

  spinal.call('inline.sendAudio', data, callback || () => {});
};

InlineSDK.prototype.sendLocation = (text, latitude, longtitude, callback) => {
  const data = {
    contextId: this.contextId,
    text: _(text).toString(),
    latitude: _(latitude).toNumber(),
    longtitude: _(longtitude).toNumber()
  };

  spinal.call('inline.sendLocation', data, callback || () => {});
};

InlineSDK.prototype.sendSticker = (stkid, stkpkgid, stkver, callback) => {
  const data = {
    contextId: this.contextId,
    stkid: _(stkid).toInteger(),
    stkpkgid: _(stkpkgid).toInteger(),
    stkver: _(stkver).toInteger()
  };

  spinal.call('inline.sendSticker', data, callback || () => {});
};

InlineSDK.prototype.sendRichMessage = (imageUrl, altText, markup, callback) => {
  if (!(markup instanceof LineBot.Markup)) throw new Error('Invalid markup');

  const data = {
    contextId: this.contextId,
    imageUrl: _(imageUrl).toString(),
    altText: _(altText).toString(),
    markup: markup
  };

  spinal.call('inline.sendRichMessage', data, callback || () => {});
};

InlineSDK.prototype.sendMultipleMessages = (multipleMessages, callback) => {
  if (!(multipleMessages instanceof LineBot.MultipleMessages)) throw new Error('Invalid multipleMessages');

  const data = {
    contextId: this.contextId,
    multipleMessages: multipleMessages
  };

  spinal.call('inline.sendMultipleMessages', data, callback || () => {});
};

InlineSDK.prototype.addSchedule = (time, value, callback) => {
  if (!time) throw new Error('Time cannot be empty');

  const timestamp = (new Date(time)).getTime();

  if (_(timestamp).isNaN()) throw new Error('Invalid time');

  const data = {
    contextId: this.contextId,
    time: timestamp,
    value: value
  };

  spinal.call('inline.setData', data, callback || () => {});
};

module.exports = InlineSDK;
