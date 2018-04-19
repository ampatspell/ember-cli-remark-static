import Service from '@ember/service';
import _ajax from 'ember-ajax';
import { getOwner } from '@ember/application';

const ajax = url => _ajax(`/assets/ember-cli-remark/markdown/${url}`);

export default Service.extend({

  files: null,

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
      promise = ajax('_index.json').then(res => this._didLoadIndex(res));
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
    return ajax(`${id}.json`);
  }

});
