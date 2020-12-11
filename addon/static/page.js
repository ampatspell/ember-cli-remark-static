import { A } from '@ember/array';
import { setOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';

const {
  assign
} = Object;

export default class Page {

  id = null
  headings = null
  frontmatter = null

  @tracked
  parent = null

  @tracked
  content

  @tracked
  pages = A();

  constructor(owner, props) {
    setOwner(this, owner);
    assign(this, props);
  }

  _addPage(page) {
    page.parent = this;
    this.pages.addObject(page);
  }

  _page(components) {
    if(components.length === 0) {
      return this;
    }

    let id = components.shift();
    let page = this.pages.findBy('name', id);
    if(!page) {
      return;
    }

    return page._page(components);
  }

  //

  didLoadContent() {
  }

  preprocessNode() {
  }

  componentNameForNode(child) {
    let type = child.type;
    let name;
    if(type === 'element') {
      name = child.tagName;
    } else {
      name = type;
    }
    return `remark/render/${name}`;
  }

  _preprocessNode(parent, node) {
    node.page = this;
    node.parent = parent;
    node.componentName = this.componentNameForNode(node);

    this.preprocessNode(parent, node);

    let { children } = node;
    children && children.forEach(child => this._preprocessNode(node, child));
  }

  _deserialize(json) {
    delete json.data;
    delete json.frontmatter;
    this._preprocessNode(null, json);
    this.content = json;
    this.didLoadContent();
  }

  async _createLoadPromise() {
    let { id, service } = this;
    let json = await service.loadJSON(id);
    this._deserialize(json);
    return this;
  }

  load() {
    let promise = this._promise;
    if(!promise) {
      promise = this._createLoadPromise();
      this._promise = promise;
    }
    return promise;
  }

  //

  page(id) {
    if(id.endsWith('/')) {
      id = id.slice(0, -1);
    }
    let components = id.split('/');
    return this._page(components);
  }

  //

  toStringExtension() {
    return this.id;
  }

}
