# Settings

You can provide optional settings parameter for `ui-remark/render`:

``` hbs
{{ui-remark/render node=root settings=settings}}
```

If provided, `settings` must be object with `preprocessNode` method:

``` javascript
export default EmberObject.extend({

  preprocessNode(parent, node) {
  }

});
```

Here you can customize node properties and choose component which will render given node:


``` javascript
export default EmberObject.extend({

  preprocessNode(parent, node) {
    if(node.tagName === 'img') {
      let src = node.properties.src;
      // update image url if src starts with /
      if(src.startsWith('/')) {
        let url = this.get('rootImageURL');
        node.properties.src = `${url}/${src}`;
      }
    } else if(node.tagName === 'image-gallery') {
      // choose a compoent name for <image-gallery></image-gallery> element
      node.componentName = 'image-gallery';
    }
  }

});
```

[&larr; back to index](/index)

**foo**
__foo__
*foo*