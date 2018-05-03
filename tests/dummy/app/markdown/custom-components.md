# Custom components

Let's say you want to render a `image-gallery` component somewhere inside your markdown content:

``` markdown
# Images

<image-gallery name="foo"></image-gallery>

Ok, moving on...
```

To do that, set `componentName` for node to `image-gallery` in [settings](/pages/settings):

``` javascript
export default EmberObject.extend({

  preprocessNode(parent, node) {
    if(node.tagName === 'image-gallery') {
      node.componentName = 'image-gallery';
    }
  }

});
```

Implement component:

``` javascript
export default Component.extend({
  classNameBindings: [ ':image-gallery' ],

  node: null,
  root: null,

});
```

And render:

<image-gallery name="foo">

![pic](/film-0353-004.jpg)

</image-gallery>

[&larr; back to index](/index)
