'use strict';

import Handlebars from 'handlebars';

export function instantiate(load) {
  return Handlebars.compile(load.source);
}
