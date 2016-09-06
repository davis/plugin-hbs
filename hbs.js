'use strict';

import Handlebars from 'handlebars';

export function translate(load) {
  let precompiled = Handlebars.precompile(load.source);
  let output;
  if (load.metadata.format === 'esm') {
    output = `import {Handlebars} from 'handlebars/handlebars.runtime.js'; \n export default Handlebars.template(${precompiled});`;
  } else if (load.metadata.format === 'amd') {
    output = `define(['handlebars/handlebars.runtime.js'], function(Handlebars) { return Handlebars.template(${precompiled}); });`;
  } else {
    output = `var Handlebars=require('handlebars/handlebars.runtime.js'); \n module.exports = Handlebars.template(${precompiled});`;
  }
  load.source = output;
  return output;
}
