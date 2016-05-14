'use strict';

if (!process.env.INLINE_NODE_NAMESPACE) throw new Error('INLINE_NODE_NAMESPACE must be specified');

const Spinal = require('spinal').Node;

const host = process.env.INLINE_BROKER_HOST || '127.0.0.1';
const port = process.env.INLINE_BROKER_PORT || '7557';
const spinal = new Spinal('spinal://' + host + ':' + port, {
  namespace: process.env.INLINE_NODE_NAMESPACE
});

module.exports = spinal;
