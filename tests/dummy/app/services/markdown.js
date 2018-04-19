import Service from '@ember/service';
import ajax from 'ember-ajax';
import { getOwner } from '@ember/application';

const url = '/assets/ember-cli-remark/markdown';

export default Service.extend({

  url,
  files: null,

  _ajax(path) {
    let url = this.get('url');
    let t = new Date().getTime();
    return ajax(`${url}/${path}?t=${t}`);
  },

  _createFile(_index) {
    return getOwner(this).factoryFor('model:file').create({ _parent: this, _index });
  },

  _didLoadIndex(res) {
    let files = res.reduce((hash, file) => {
      hash[file.id] = this._createFile(file);
      return hash;
    }, {});
    this.set('files', files);
    return this;
  },

  loadIndex() {
    let promise = this._loadIndex;
    if(!promise) {
      promise = this._ajax('_index.json').then(res => this._didLoadIndex(res));
      this._loadIndex = promise;
    }
    return promise;
  },

  load(id) {
    return this.loadIndex().then(() => {
      let file = this.get('files')[id];
      if(!file) {
        return;
      }
      return file.load();
    });
  },

  _loadFile(file) {
    let id = file.get('_index.id');
    return this._ajax(`${id}.json`);
  }

});
