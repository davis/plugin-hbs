# plugin-hbs
Handlebars template loader plugin for system.js

## Installation

```bash
jspm install hbs
```

## Usage

You can now import your .hbs files as such:

```javascript
'use strict';

import {ItemView} from 'marionette';
import template from './myTemplate.hbs!';

export default ItemView.extend({
  template,
  initialize() {}
});
```

To use helpers, be sure to use the Handlebars runtime. You'll need to have Handlebars installed in your project.

js:
```javascript
'use strict';

import Handlebars from 'handlebars/handlebars.runtime';

Handlebars.registerHelper('wrapWithMoo', (options) => {
  return new Handlebars.SafeString(`moo! ${options.fn(this)} moo!`);
});
```

template:
```handlebars
<p>{{#wrapWithMoo}}(this should be surrounded by the sound a cow makes){{/wrapWithMoo}}</p>
```

Head over to https://github.com/davis/jspm-marionette to see a working example that uses this plugin.
