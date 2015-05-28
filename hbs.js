'use strict';

import Handlebars from 'handlebars';

export function translate(load)  {
  load.source = Handlebars.compile(load);
}
