# ember-cli-remark

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

## Add `app/markdown/index.md`

``` markdown
# Hey there
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
        "value": "Hey there"
      }
    ]
  }
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
      "type": "heading",
      "depth": 1,
      "children": [
        {
          "type": "text",
          "value": "Hey there"
        }
      ]
    }
  ]
}
```

## Render parsed markdown

``` hbs
{{ui-remark/render content}}
```

![pic.jpg]