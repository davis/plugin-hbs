'use strict';

import Handlebars from 'handlebars';

/**
 * Attaches the precompiled Handlebars template in a CommonJs module,
 * and attaches any depended partials on `load` for system.js to
 * fetch. Also registers the partials as such on the Handlebars
 * runtime.
 */
export function translate(load) {

  let ast = Handlebars.parse(load.source);
  let partials = findPartials(ast);
  load.metadata.deps = partials;

  let precompiled = Handlebars.precompile(load.source);
  let handlebarsRuntimePath = System.normalizeSync('handlebars/handlebars.runtime', __moduleName);

  let output;
  if (load.metadata.format === 'esm') {
    let partialReqs = partials.map((dep, i) => {
      return `import tmpl$i from '${dep}';`;
    }).join('\n');
    let registry = partials.map((dep, i) => {
      return `Handlebars.registerPartial('${dep}', tmpl${i});`;
    }).join('\n');

    output = `
import {Handlebars} from '${handlebarsRuntimePath}';
${partialReqs}
${registry}
export default Handlebars.template(${precompiled});
`;
  } else if (load.metadata.format === 'amd') {
    let partialReqs = partials.map(dep => `'${dep}'`).join(', ');
    let args = partials.map((dep, i) => `tmpl${i}`).join(', ');
    let registry = partials.map((dep, i) => {
      return `Handlebars.registerPartial('${dep}', tmpl${i});`;
    }).join('\n  ');
    
    output = `
define(['${handlebarsRuntimePath}', ${partialReqs}],
       function(Handlebars, ${args}) {
  ${registry};
  return Handlebars.template(${precompiled});
});
`;
  } else {
    let partialReqs = partials.map(dep => {
      return `Handlebars.registerPartial('${dep}', require('${dep}'));`;
    }).join('\n');
    output = `
var Handlebars = require('${handlebarsRuntimePath}');
${partialReqs};
module.exports = Handlebars.template(${precompiled});
`;
  }
  load.source = output;
  return output;
}

/**
 * Recursively trawls a Handlebars AST, providing the string names of
 * all invoked partials.
 */
function findPartials(astRoot) {
  let partials = [];

  let recurse = function(ast) {
    if (!ast) {
      return;
    } else if (Array.isArray(ast)) {
      ast.forEach(n => recurse(n));
    } else if (ast.type === 'PartialStatement') {
      partials.push(ast.name.original);
    } else if (typeof ast === 'object') {
      let subnodes = Object.keys(ast).map(k => ast[k]);
      subnodes.forEach(n => recurse(n));
    }
  };
  recurse(astRoot);

  return partials;
}
