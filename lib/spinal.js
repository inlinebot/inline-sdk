'use strict';

const Spinal = require('spinal').Node;
const spinal = new Spinal('spinal://' + process.env.INLINE_BROKER_HOST + ':' + process.env.INLINE_BROKER_PORT, {
  namespace: process.env.INLINE_NODE_NAMESPACE
});

module.exports = spinal;
