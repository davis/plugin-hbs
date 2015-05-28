'use strict';

export function translate(load) {
  console.log(`compiling template: ${load.name}`);
  return `import Handlebars from 'handlebars';

export default Handlebars.compile(` + load.source + `)`;
}
