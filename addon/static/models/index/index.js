import EmberObject from '@ember/object';
import { getOwner } from '@ember/application';
import { A } from '@ember/array';
import { assign } from '@ember/polyfills';

export default EmberObject.extend({

  service: null,
  identifier: null,

  files: null,
  content: null,

  _createItem(props) {
    let id = props.id;

    let name;
    let parentId;

    if(id) {
      let components = id.split('/');
      name = components.pop();
      parentId = components.join('/') || null;
    }

    let factory = getOwner(this).factoryFor('remark-static:static/index/item');

    return factory.create(assign(props, {
      name,
      parentId,
      items: A()
    }));
  },

  _deserializeFile(json) {
    let props = this.get('service').preprocessIndexItem(json) || json;
    return this._createItem(assign(props, { type: 'file' }));
  },

  _deserializeFiles(array) {
    return A(A(array).map(item => this._deserializeFile(item)));
  },

  _deserializeContent(models) {
    let root = this._createItem({ type: 'directory' });

    models = A(models.slice());
    models.pushObject(root);

    const bind = (model) => {
      let parent = parentFor(model);
      model.set('parent', parent);
      parent.get('items').pushObject(model);
    }

    const parentFor = model => {
      let parentId = model.get('parentId');
      let parent = models.findBy('id', parentId);
      if(!parent) {
        parent = this._createItem({ id: parentId, type: 'directory' });
        models.push(parent);
        bind(parent);
      }
      return parent;
    };

    models.forEach(model => bind(model));

    return root;
  },

  _deserialize(json) {
    let files = this._deserializeFiles(json);
    let content = this._deserializeContent(files);
    this.setProperties({
      files,
      content
    });
  },

  _createLoadPromise() {
    return this.get('service').loadJSON('_index')
      .then(json => this._deserialize(json))
      .then(() => this);
  },

  load() {
    let load = this._load;
    if(!load) {
      load = this._createLoadPromise();
      this._load = load;
    }
    return load;
  }

});
