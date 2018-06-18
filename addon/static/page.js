import EmberObject, { computed } from '@ember/object';
import { A } from '@ember/array';

export default EmberObject.extend({

  service: null,

  // index
  id: null,
  headings: null,
  frontmatter: null,

  parent: null,
  pages: computed(function() {
    return A();
  }).readOnly(),

  _addPage(page) {
    page.set('parent', this);
    this.get('pages').addObject(page);
  },

  _page(components) {
    if(components.length === 0) {
      return this;
    }

    let id = components.shift();
    let page = this.get('pages').findBy('name', id);
    if(!page) {
      return;
    }

    return page._page(components);
  },

  page(id) {
    let components = id.split('/');
    return this._page(components);
  },

  _deserialize(json) {
    delete json.data;
    delete json.frontmatter;
    this.set('content', json);
  },

  _createLoadPromise() {
    let { id, service } = this.getProperties('id', 'service');
    return service.loadJSON(id)
      .then(json => this._deserialize(json))
      .then(() => this);
  },

  load() {
    let promise = this._promise;
    if(!promise) {
      promise = this._createLoadPromise();
      this._promise = promise;
    }
    return promise;
  },

  preprocessNode() {
  },

  toStringExtension() {
    return this.get('id');
  }

});
