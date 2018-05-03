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

``` hbs
<div>this: {{this}}</div>
<div>root: {{root}}</div>
<div>root.settings {{root.settings}}</div>
<div>node.properties.name: {{node.properties.name}}</div>
<div>clicks: {{count}}</div>

{{ui-remark/render/content node=node parent=this}}
```

And render:

<image-gallery name="foo">

  ![pic](/film-0353-004.jpg)

</image-gallery>

[&larr; back to index](/index)
