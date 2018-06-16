import EmberObject, { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { A } from '@ember/array';
import { assign } from '@ember/polyfills';

export default EmberObject.extend({

  pages: null,

  id: null,
  isLoaded: false,

  content: null,

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
