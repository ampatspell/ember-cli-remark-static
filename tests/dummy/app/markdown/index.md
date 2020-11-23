# [ember-cli-remark-static](https://github.com/ampatspell/ember-cli-remark-static)

This addon lets you to add one or more folders with markdown files which are parsed on build to json element tree and then can be rendered by using provided `<Remark::Render/>` component.

Works with `ember-cli-fastboot` and `prember`.

## Install

```
$ ember install ember-cli-remark-static
```

## Configure name to path mappings

``` javascript
// ember-cli-build.js
let app = new EmberAddon(defaults, {
  'ember-cli-remark-static': {
    debug: true,
    paths: {
      'markdown': 'app/markdown'
    }
  }
});
```

## Import index

``` javascript
import index from 'ember-cli-remark-static/-index';
```

``` json
[
  {
    "id": "index",
    "frontmatter": {
      ...
    },
    "headings": [
      {
        "level": "1",
        "value": "ember-cli-remark-static"
      },
      {
        "level": "2",
        "value": "Install"
      },
      {
        "level": "2",
        "value": "Configure name to path mappings"
      },
      {
        "level": "2",
        "value": "Load _index.json"
      },
      {
        "level": "2",
        "value": "Load parsed markdown"
      },
      {
        "level": "2",
        "value": "Render parsed markdown"
      },
      {
        "level": "2",
        "value": "Examples"
      }
    ]
  },
  ...
]
```

## Load parsed markdown

``` javascript
fetch('/assets/ember-cli-remark-static/markdown/index.json')
```

``` json
{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tagName": "h1",
      "properties": {},
      "children": [
        {
          "type": "element",
          "tagName": "a",
          "properties": {
            "href": "https://github.com/ampatspell/ember-cli-remark-static"
          },
          "children": [
            {
              "type": "text",
              "value": "ember-cli-remark-static"
            }
          ]
        }
      ]
    },
    {
      "type": "text",
      "value": "\n"
    },
    ...
  ]
}
```

## Using loader service

``` javascript
// services/markdown.js
import Service from 'ember-cli-remark-static/static/service';

export default class MarkdownService extends Service {

  identifier = 'markdown'

  pageFactoryName(id) {
    if(id) {
      let [ folder, ...rest ] = id.split('/');
      if(folder === 'articles') {
        return 'model:article';
      }
    }
    return 'model:page';
  }

}
```

``` javascript
// models/page.js
import Page from 'ember-cli-remark-static/static/page';

export default class MarkdownPage extends Page {

  didLoadContent() {
  },

  preprocessNode(parent, node) {
  }

};
```

``` javascript
// routes/pages/page.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class PageRoute extends Route {

  @service
  markdown

  model({ page_id : id }) {
    // load page by id
    return this.markdown.load(id);
  }

}
```

``` hbs
<Remark::Render @page={{@model}}/>
```

## Examples

* [Settings](/pages/settings)
* [Custom components](/pages/custom-components)
