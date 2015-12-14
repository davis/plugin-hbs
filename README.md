# plugin-hbs
Handlebars template loader plugin for SystemJS

## Installation

```bash
jspm install hbs
```

## Usage

You can now import your `.hbs` files as such:

### jQuery
```javascript
'use strict';
import $ from 'jquery';

import template from './template.hbs!';
import data from './data.json!';

const html = template(data);

$('#content').html(html);
```

### Marionette
```javascript
'use strict';

import {ItemView} from 'marionette';
import template from './myTemplate.hbs!';

export default ItemView.extend({
  template,
  initialize() {}
});
```

### How to use helpers
To use helpers, be sure to use the Handlebars runtime. You'll need to have Handlebars installed in your project.

**JavaScript**

```javascript
'use strict';

import Handlebars from 'handlebars/handlebars.runtime';

Handlebars.registerHelper('wrapWithMoo', (options) => {
  return new Handlebars.SafeString(`moo! ${options.fn(this)} moo!`);
});
```

**Handlebars**

```handlebars
<p>{{#wrapWithMoo}}(this should be surrounded by the sound a cow makes){{/wrapWithMoo}}</p>
```

### How to use partials
The use of partials is quite similar to helpers. Just be sure to use the Handlebars runtime.

**JavaScript**

```javascript
'use strict';

import Handlebars from 'handlebars/handlebars.runtime';
import myPartial from './myPartial.hbs!';

Handlebars.registerPartial('myPartial', myPartial);
```

**Handlebars**

```handlebars
{{> myPartial }}
```

***

Head over to https://github.com/davis/jspm-marionette to see a working example that uses this plugin.
