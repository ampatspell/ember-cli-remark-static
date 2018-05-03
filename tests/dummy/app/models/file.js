import EmberObject from '@ember/object';
import { readOnly } from '@ember/object/computed'

export default EmberObject.extend({

  _parent: null,
  _index: null,

  id: readOnly('_index.id'),
  title: readOnly('_index.headings.0.value'),

  content: null,

  _didLoadContent(content) {
    this.set('content', content);
    return this;
  },

  load() {
    let promise = this._load;
    if(!promise) {
      promise = this.get('_parent')._loadFile(this).then(content => this._didLoadContent(content));
      this._load = promise;
    }
    return promise;
  },

  preprocessNode(parent, node) {
    if(node.tagName === 'img') {
      let src = node.properties.src;
      if(src.startsWith('/')) {
        let url = this.get('_parent.url');
        node.properties.src = `${url}/${src}`;
      }
    } else if(node.tagName === 'a') {
      let href = node.properties.href;
      if(href.startsWith('/')) {
        node.componentName = 'ui-remark/render/route';
        let url = href.substr(1);
        let routeName;
        let id;
        let components = url.split('/');
        if(components[0] === 'pages') {
          routeName = 'pages';
          id = components[1];
        } else {
          routeName = url;
        }
        node.properties.routeName = routeName;
        node.properties.id = id;
      }
    }
  },

});
