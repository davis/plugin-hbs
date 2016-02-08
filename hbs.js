'use strict';

import Handlebars from 'handlebars';

const handlebarsRuntimePath = System.normalizeSync('handlebars/handlebars.runtime', __moduleName);

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
  let partialReqs = partials.map(dep =>
      `Handlebars.registerPartial('${dep}', require('${dep}'));`);
  
  load.source = `
  var Handlebars = require('${handlebarsRuntimePath}');
  ${partialReqs.join('\n')};
  module.exports = Handlebars.template(${precompiled});
  `;
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
