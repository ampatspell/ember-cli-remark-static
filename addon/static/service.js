import Service from '@ember/service';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';
import { resolve, reject } from 'rsvp';
import fetch from 'fetch';
import Index from './internal/index';
import json from 'ember-cli-remark-static/-index';

const indexForIdentifier = identifier => {
  assert(`identifier is required`, !!identifier);
  let index = json[identifier];
  assert(`static content for identifier '${identifier}' not found`, !!index);
  return index;
}

export default Service.extend({

  identifier: null,

  content: null, // root
  pages: null,   // array

  init() {
    this._super(...arguments);
    this._internal = {
      index: new Index(this, indexForIdentifier(this.get('identifier')))
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
    return resolve(fetch(url)).then(res => res.json());
  },

  load(id) {
    let page = this.page(id);
    if(!page) {
      let err = new Error(`Page ${id} was not found`);
      err.code = 'not-found';
      return reject(err);
    }
    return page.load();
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
