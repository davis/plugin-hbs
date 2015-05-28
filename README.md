# plugin-hbs
Handlebars template loader plugin for system.js

## Installation

```bash
jspm install hbs=github:davis/plugin-hbs
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
