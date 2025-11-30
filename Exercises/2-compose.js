'use strict';
const EventEmitter = require('events');

const compose = (...fns) => {
  const emitter = new EventEmitter();

  const wrapper = (x) => {
    let result = x;
    for (let i = fns.length - 1; i >= 0; i--) {
      try {
        result = fns[i](result);
      } catch (e) {
        emitter.emit('error', e);
        return undefined;
      }
    }

    return result;
  };
  wrapper.on = (event, listener) => {
    emitter.on(event, listener);
    return wrapper;
  };

  return wrapper;
};

module.exports = { compose };
