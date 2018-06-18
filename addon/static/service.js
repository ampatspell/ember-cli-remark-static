import Service from '@ember/service';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';
import { reject } from 'rsvp';
import fetch from 'fetch';
import Index from './internal/index';

export default Service.extend({

  identifier: null,

  content: null, // root
  pages: null,   // array

  init() {
    this._super(...arguments);
    this._internal = {
      index: new Index(this)
    };
  },

  basePath: computed(function() {
    let identifier = this.get('identifier');
    assert(`'identifier' is required`, typeof identifier === 'string');
    let environment = getOwner(this).factoryFor('config:environment').class;
    let rootURL = environment.rootURL || '';
    let delimiter = rootURL.endsWith('/') ? '' : '/';
    return `${rootURL}${delimiter}assets/ember-cli-remark-static/${identifier}`;
  }).readOnly(),

  baseURL: computed('basePath', function() {
    let basePath = this.get('basePath');
    let fastboot = getOwner(this).lookup('service:fastboot');
    if(fastboot && fastboot.get('isFastBoot')) {
      let { protocol, host } = fastboot.get('request').getProperties('protocol', 'host');
      if(protocol === 'undefined') {
        protocol = 'http:';
      }
      return `${protocol}//${host}${basePath}`;
    }
    return basePath;
  }).readOnly(),

  resolveURL(path, ext) {
    let base = this.get('baseURL');
    if(path.startsWith('/')) {
      path = path.slice(1);
    }
    if(path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    let filename = ext ? `${path}.${ext}` : path;
    return `${base}/${filename}`;
  },

  loadJSON(path) {
    let url = this.resolveURL(path, 'json');
    return fetch(url).then(res => res.json());
  },

  loadIndex() {
    return this._internal.index.load().then(() => this);
  },

  loadPage(id) {
    return this.loadIndex().then(() => {
      let page = this.page(id);
      if(!page) {
        let err = new Error(`Page ${id} was not found`);
        err.code = 'not-found';
        return reject(err);
      }
      return page.load();
    });
  },

  load(opts) {
    if(typeof opts === 'string') {
      opts = { page: opts };
    } else if(!opts) {
      opts = { index: true };
    }
    let { index, page } = opts;
    assert(`'{ index: true }' and/or '{ page: id }' is required`, index || page);
    if(page) {
      return this.loadPage(page);
    } else {
      return this.loadIndex();
    }
  },

  page(id) {
    let content = this.get('content');
    if(!content) {
      return;
    }
    return content.page(id);
  },

  _pageFactoryNameForId(id) {
    let name;
    if(typeof this.pageFactoryName === 'function') {
      name = this.pageFactoryName(id);
    } else {
      name = this.pageFactoryName;
    }
    return name || 'remark-static:static/page';
  },

  _pageFactoryForId(id) {
    let name = this._pageFactoryNameForId(id);
    let factory = getOwner(this).factoryFor(name);
    assert(`factory '${name} is not registered`, !!factory);
    return factory;
  }

});
