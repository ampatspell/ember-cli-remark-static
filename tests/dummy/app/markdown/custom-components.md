# Custom components

Let's say you want to render a `image-gallery` component somewhere inside your markdown content:

``` markdown
# Images

<image-gallery name="foo">

  ![pic](/film-0353-004.jpg)

</image-gallery>

Ok, moving on...
```

To do that, set `componentName` for node to `image-gallery` in [settings](/pages/settings):

``` javascript
import Page from 'ember-cli-remark-static/static/page';

export default class MarkdownPage extends Page {

  preprocessNode(parent, node) {
    if(node.tagName === 'image-gallery') {
      node.componentName = 'image-gallery';
    }
  }

};
```

Implement component:

``` javascript
import Element from 'ember-cli-remark-static/components/remark/render/element';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ImageGalleryComponent extends Element {

  @tracked
  count = 0

  @action
  onClick() {
    this.count++;
  }

}
```

``` hbs
<div class="custom-image-gallery" role="button" {{on "click" this.onClick}}>

  <div>this: {{this}}</div>
  <div>root.settings {{this.root.settings}}</div>
  <div>node.properties.name: {{@node.properties.name}}</div>
  <div>clicks: {{this.count}}</div>

  <Remark::Render::Content @node={{@node}} @parent={{this}}/>

</div>
```

And render:

<image-gallery name="foo">

  ![pic](/film-0353-004.jpg)

</image-gallery>

[&larr; back to index](/index)
