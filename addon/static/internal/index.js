import { A } from '@ember/array';

const {
  assign
} = Object;

export default class Index {

  constructor(service, json) {
    this.service = service;
    this.deserialize(json);
  }

  createPageForId(id, props) {
    let service = this.service;
    return service._pageFactoryForId(id).create(assign({ service }, props));
  }

  deserializePages(json) {
    json = A([ ...json ]);

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

    let { service } = this;

    service.content = content;
    service.pages = pages;
  }

}
