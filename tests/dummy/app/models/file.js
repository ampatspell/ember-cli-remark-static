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

  urlForImageReference(node) {
    let identifier = node.identifier;
    let url = this.get('_parent.url');
    return `${url}/${identifier}`;
  },

});
