# [ember-cli-remark](https://github.com/ampatspell/ember-cli-remark)

## Install

```
$ ember install ember-cli-remark
```

## Configure name to path mappings

``` javascript
// ember-cli-build.js
let app = new EmberAddon(defaults, {
  'ember-cli-remark': {
    debug: true,
    paths: {
      'markdown': 'app/markdown'
    }
  }
});
```

## Load `_index.json`

``` javascript
fetch('/assets/ember-cli-remark/markdown/_index.json');
```

``` json
[
  {
    "id": "index",
    "headings": [
      {
        "depth": 1,
        "value": "ember-cli-remark"
      },
      {
        "depth": 2,
        "value": "Install"
      },
      {
        "depth": 2,
        "value": "Configure name to path mappings"
      },
      {
        "depth": 2,
        "value": "Add app/markdown/index.md"
      },
      {
        "depth": 2,
        "value": "Load _index.json"
      },
      {
        "depth": 2,
        "value": "Load parsed markdown"
      },
      {
        "depth": 2,
        "value": "Render parsed markdown"
      }
    ]
  },
  ...
]
```

## Load parsed markdown

``` javascript
fetch('/assets/ember-cli-remark/markdown/index.json')
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
            "href": "https://github.com/ampatspell/ember-cli-remark"
          },
          "children": [
            {
              "type": "text",
              "value": "ember-cli-remark"
            }
          ]
        }
      ]
    },
    {
      "type": "text",
      "value": "\n"
    }
  ]
  ...
}
```

## Render parsed markdown

``` hbs
{{ui-remark/render node=model.content settings=model.settings}}
```

<custom name="foo"></custom>

* [about](/pages/about)
* [components](/pages/components)
