import Service from '@ember/service';
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { cached } from "tracked-toolbox";
import { sortedBy } from '../util/array';
import { oncePromise } from '../util/once';
import { assert } from '@ember/debug';

export default class FilesService extends Service {

  @service('remark@asset-map') assetMap;
  @service('remark@models') models;

  @tracked all = null;

  @cached
  get sorted() {
    return sortedBy(this.all, file => file.attributes?.position);
  }

  async _loadModels() {
    let { json } = await this._createModel('metadata', 'metadata.json').load();
    let all = [];
    for(let name in json) {
      let metadata = json[name];
      let model = this._createModel(metadata.type, name);
      model._metadata(metadata);
      all.push(model);
    }
    this.all = all;
  }

  @oncePromise
  async load() {
    await this.assetMap.load();
    await this._loadModels();
    return this;
  }

  _createModel(type, name) {
    return this.models.create(`remark/files/${type}`, { files: this, name, type });
  }

  async _fetch(name) {
    let { identifier } = this;
    assert(`files identifier is required`, !!identifier);
    let filename = `remark/${identifier}/${name}`;
    filename = this.assetMap.resolve(filename);
    let res = await fetch(filename);
    if(res.status === 404) {
      throw new Error(`${filename} was not found`);
    }
    return res;
  }

  async _loadModel(model) {
    let { name } = model;
    let res = await this._fetch(name);
    await model._load(res);
  }

  // let file = await this.files.file('hello.md').load();
  file(name) {
    return this.sorted.find(file => file.name === name);
  }

  find(cb) {
    return this.sorted.find(cb);
  }

  filter(cb) {
    return this.sorted.filter(cb);
  }

}
