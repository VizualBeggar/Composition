'use strict';

const pipe = (...fns) => {
  for (const fn of fns) {
    if (typeof fn !== 'function') {
      throw new TypeError('All arguments to pipe must be functions');
    }
  }

  return (x) => fns.reduce((acc, fn) => fn(acc), x);
};

module.exports = { pipe };
