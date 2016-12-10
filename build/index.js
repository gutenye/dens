'use strict';

if (typeof window === 'undefined') {
  exports.den = null;
  exports.dens = null;
} else {
  require('./dens');
}