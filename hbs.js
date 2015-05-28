'use strict';

export function translate(load) {
  console.log(`compiling template: ${load.name}`);
  const escaped = load.source.replace('`', '\\`');
  return `import Handlebars from 'handlebars';\n\nexport default Handlebars.compile(${escaped})`;
}
