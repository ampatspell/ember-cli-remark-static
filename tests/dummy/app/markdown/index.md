# [ember-cli-remark-static](https://github.com/ampatspell/ember-cli-remark-static)

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

## Load `_index.json`

``` javascript
fetch('/assets/ember-cli-remark-static/markdown/_index.json');
```

``` json
[
  {
    "id": "index",
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

## Render parsed markdown

``` hbs
{{ui-remark/render node=root settings=settings}}
```

## Examples

* [Settings](/pages/settings)
* [Custom components](/pages/custom-components)
