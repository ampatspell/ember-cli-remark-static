import EmberObject, { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { A } from '@ember/array';
import { assign } from '@ember/polyfills';
import { assert } from '@ember/debug';

const normalize = (id='') => {
  assert(`id is required`, typeof id === 'string');
  id = id.trim();
  if(id.endsWith('/')) {
    id = id.slice(0, -1);
  }
  assert(`id cannot be blank`, id.length > 0);
  return id;
}

export default EmberObject.extend({

  service: null,

  content: computed(function() {
    return A();
  }).readOnly(),

  _createPage(props) {
    return getOwner(this).factoryFor('remark-static:static/pages/page').create(assign(props, { pages: this }));
  },

  loadJSON(path) {
    return this.get('service').loadJSON(path);
  },

  peek(id, create) {
    id = normalize(id);
    let content = this.get('content');
    let page = content.findBy('id', id);
    if(!page && create) {
      page = this._createPage({ id, isLoaded: false });
      content.pushObject(page);
    }
    return page;
  },

  load(id) {
    let page = this.peek(id, true);
    return page.load();
  },

  preprocessPage(page, json) {
    return this.get('service').preprocessPage(page, json);
  },

  preprocessNode(page, parent, node) {
    return this.get('service').preprocessNode(page, parent, node);
  }

});
