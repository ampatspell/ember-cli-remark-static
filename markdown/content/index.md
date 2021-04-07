---
title: ember-cli-remark-static
---

# [ember-cli-remark-static](https://github.com/ampatspell/ember-cli-remark-static)

This addon lets you to add one or more folders with markdown files which are parsed and indexed on build to json element tree and then can be rendered by using provided `<Remark/>` component.

Works with `ember-cli-fastboot` and `prember`.

# Install

``` bash
$ ember install ember-cli-remark-static
```

# Configure content collections

``` js
// ember-cli-build.js
let app = new EmberAddon(defaults, {
  remark: {
    collections: {
      // identifier: directory
      'content': 'markdown/content',
      // or
      'content: {
        path: 'markdown/content',
        toc: true // default
      }
    }
  }
});
```

# Subclass `Files` service for each collection

``` js
// app/services/content.js
import FilesService from 'remark/services/files';

export default class ContentFilesService extends FilesService {
  identifier = 'content';
}
```

# Load files index

``` js
import Route from '@ember/routing/route';
import { inject as service } from "@ember/service";

export default class ApplicationRoute extends Route {

  @service content;

  async beforeModel() {
    await this.content.load();
  }

}
```

# Load file

``` js
let file = this.content.file('hello.md');
await file.load();
```

# Wrap file in a model

``` js
// app/models/page.js
import { remark } from 'remark/decorators';
import { reads } from "macro-decorators";

export default class Page {

  constructor({ file }) {
    this.file = file;
  }

  @reads('file.body') body;

  @remark('body')
  tree(node) {
    if(node.tagName === 'a') {
      let { properties: { href } } = node;
      if(href.startsWith('http:') || href.startsWith('https:')) {
        node.properties.target = 'top';
      }
    }
    return node;
  }

  async load() {
    await this.file.load();
    await this.tree.load();
  }

}
```

``` js
let file = this.content.file('hello.md');
let page = new Page({ file });
await page.load();
```

# Render markdown

``` hbs
<div class="route-index">
  <Remark class="remark" @tree={{@model.tree}}/>
</div>
```

# TODO

* components
* `assetMap.json`
* `metadata.json`
* File types, properties
* binary files

* [Components](/components)
