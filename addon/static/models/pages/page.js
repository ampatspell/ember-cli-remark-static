import EmberObject, { computed } from '@ember/object';

export default EmberObject.extend({

  pages: null,

  id: null,
  isLoaded: false,

  content: null,

  index: computed('id', function() {
    let id = this.get('id');
    if(!id) {
      return;
    }
    return this.get('pages.service.index.files').findBy('id', id);
  }).readOnly(),

  _deserialize(json) {
    let preprocessed = this.get('pages').preprocessPage(this, json) || json;
    this.set('content', preprocessed);
  },

  _createLoadPromise() {
    return this.get('pages').loadJSON(this.get('id'))
      .then(json => this._deserialize(json))
      .then(() => this.set('isLoaded', true))
      .then(() => this);
  },

  load() {
    let load = this._load;
    if(!load) {
      load = this._createLoadPromise();
      this._load = load;
    }
    return load;
  },

  preprocessNode(parent, node) {
    return this.get('pages').preprocessNode(this, parent, node);
  }

});
