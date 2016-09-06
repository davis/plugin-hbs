'use strict';

import Handlebars from 'handlebars';

export function translate(load) {
  let precompiled = Handlebars.precompile(load.source);
  let handlebarsRuntimePath = System.normalizeSync('handlebars/handlebars.runtime.js', __moduleName);

  // in builds we want to embed the canonical name for the handlebars runtime
  if (System.getCanonicalName) {
    handlebarsRuntimePath = System.getCanonicalName(handlebarsRuntimePath);
  }

  let output;
  if (load.metadata.format === 'esm') {
    output = `import {Handlebars} from '${handlebarsRuntimePath}'; \n export default Handlebars.template(${precompiled});`;
  } else if (load.metadata.format === 'amd') {
    output = `define(['${handlebarsRuntimePath}'], function (Handlebars) { return Handlebars.template(${precompiled}); });`;
  } else {
    output = `var Handlebars = require('${handlebarsRuntimePath}'); \n module.exports = Handlebars.template(${precompiled});`;
  }
  load.source = output;
  return output;
}
