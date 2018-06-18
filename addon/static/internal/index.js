import { A } from '@ember/array';
import { assign } from '@ember/polyfills';

export default class Index {

  constructor(service) {
    this.service = service;
  }

  loadJSON(...args) {
    return this.service.loadJSON(...args);
  }

  createPageForId(id, props) {
    let service = this.service;
    return service._pageFactoryForId(id).create(assign({ service }, props));
  }

  deserializePages(json) {
    json = A(json);

    let root = this.createPageForId(null, { id: null, name: null });
    let pages = A();
    let mapping = {};

    const createPage = id => {
      let components = id.split('/');
      let name = components.pop();
      let parentId = components.join('/') || null;

      let entry = json.findBy('id', id);

      let page = mapping[id];
      if(!page) {
        page = this.createPageForId(id, assign({ id, name }, entry));
        mapping[id] = page;
        pages.push(page);
        let parent = parentId ? createPage(parentId) : root;
        parent._addPage(page);
      }

      return page;
    }

    json.forEach(entry => createPage(entry.id));

    return { root, pages };
  }

  deserialize(json) {
    let {
      root: content,
      pages
    } = this.deserializePages(json);

    this.service.setProperties({
      content,
      pages
    });
  }

  createLoadPromise() {
    return this.loadJSON('_index')
      .then(json => this.deserialize(json))
      .then(() => this);
  }

  load() {
    let promise = this._promise;
    if(!promise) {
      promise = this.createLoadPromise();
      this._promise = promise;
    }
    return promise;
  }

}
