import Service from '@ember/service';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';
import fetch from 'fetch';

export default Service.extend({

  identifier: null,

  baseURL: computed(function() {
    let identifier = this.get('identifier');
    assert(`'identifier' is required`, typeof identifier === 'string');
    let environment = getOwner(this).factoryFor('config:environment').class;
    let rootURL = environment.rootURL || '';
    let delimiter = rootURL.endsWith('/') ? '' : '/';
    return `${rootURL}${delimiter}assets/ember-cli-remark-static/${identifier}`;
  }).readOnly(),

  index: computed(function() {
    return getOwner(this).factoryFor('remark-static:static/index').create({ service: this });
  }).readOnly(),

  resolveURL(path, ext) {
    let base = this.get('baseURL');
    return `${base}/${path}.${ext}`;
  },

  loadJSON(path) {
    let url = this.resolveURL(path, 'json');
    return fetch(url).then(res => res.json());
  },

  preprocessIndexItem() {
  },

});
