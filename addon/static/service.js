import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';
import json from 'ember-cli-remark-static/-index';
import Index from './internal/index';
import fetch from 'fetch';
import classic from 'ember-classic-decorator';

const indexForIdentifier = identifier => {
  assert(`identifier is required`, !!identifier);
  let index = json[identifier];
  assert(`static content for identifier '${identifier}' not found`, !!index);
  return index;
}

@classic
export default class RemarkStaticService extends Service {

  identifier = null

  content = null
  pages = null

  init() {
    super.init(...arguments);
    this._internal = {
      index: new Index(this, indexForIdentifier(this.identifier))
    }
  }

  // @cached
  get basePath() {
    let { identifier } = this;
    assert(`'identifier' is required`, typeof identifier === 'string');
    let environment = getOwner(this).factoryFor('config:environment').class;
    let rootURL = environment.rootURL || '';
    let delimiter = rootURL.endsWith('/') ? '' : '/';
    return `${rootURL}${delimiter}assets/ember-cli-remark-static/${identifier}`;
  }

  // @cached
  get baseURL() {
    let { basePath } = this;
    let fastboot = getOwner(this).lookup('service:fastboot');
    if(fastboot && fastboot.isFastBoot) {
      let { protocol, host } = fastboot.request;
      if(protocol === 'undefined:') {
        protocol = 'http:';
      }
      return `${protocol}//${host}${basePath}`;
    }
    return basePath;
  }

  resolveURL(path, ext) {
    let base = this.baseURL;
    if(path.startsWith('/')) {
      path = path.slice(1);
    }
    if(path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    let filename = ext ? `${path}.${ext}` : path;
    return `${base}/${filename}`;
  }

  _pageFactoryNameForId(id) {
    let name;
    if(typeof this.pageFactoryName === 'function') {
      name = this.pageFactoryName(id);
    } else {
      name = this.pageFactoryName;
    }
    return name || 'remark-static:static/page';
  }

  _pageFactoryForId(id) {
    let name = this._pageFactoryNameForId(id);
    let factory = getOwner(this).factoryFor(name);
    assert(`factory '${name} is not registered`, !!factory);
    return {
      create: props => new factory.class(getOwner(this), props)
    };
  }

  async loadJSON(path) {
    let url = this.resolveURL(path, 'json');
    let res = await fetch(url);
    let json = await res.json();
    return json;
  }

  async load(id) {
    let page = this.page(id);
    if(!page) {
      let err = new Error(`Page ${id} was not found`);
      err.code = 'not-found';
      throw err;
    }
    return await page.load();
  }

  page(id) {
    let { content } = this;
    if(!content) {
      return;
    }
    return content.page(id);
  }

}
