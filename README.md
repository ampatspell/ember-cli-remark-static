# ember-cli-remark-static

## Install

``` bash
$ ember install ember-cli-remark-static
```

## Configure collections

``` js
// ember-cli-build.js
let app = new EmberAddon(defaults, {
  remark: {
    collections: {
      // identifier: directory
      'content': 'markdown/content',
      // or
      'content': {
        path: 'markdown/content',
        toc: true // default
      }
    }
  }
});
```

## Subclass files service for each collection

``` js
// app/services/content.js
import FilesService from 'remark/services/files';

export default class Content extends FilesService {
  identifier = 'content';
}
```

## Load files index

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

## Load file

``` js
let file = this.content.file('hello.md');
await file.load();
```

## Preprocess markdown

``` js
import { setOwner } from '@ember/application';
import { reads } from "macro-decorators";
import { remark } from 'remark/decorators';

export default class Page {

  constructor(owner, { file }) {
    setOwner(this, owner);
    this.file = file;
  }

  @reads('file.body') body;

  @remark('body')
  tree(node) {
    if(node.tagName === 'h1') {
      node.children[0].value = 'Hey there';
    }
    return node;
  }

  async load() {
    await this.file.load();
    await this.tree.load(); // eager.
    return this;
  }

}
```

## Render

``` hbs
<Remark class="content" @tree={{@page.tree}}/>
```
