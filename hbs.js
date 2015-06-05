'use strict';

export function translate(load) {
  console.log(`compiling template: ${load.name}`);
  const escaped = load.source.replace('`', '\\`');
  load.source = `module.exports = require('handlebars').compile(\`${escaped}\`);`;
}
