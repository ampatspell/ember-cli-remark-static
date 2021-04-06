import { setOwner } from '@ember/application';
import { lastObject } from '../../util/array';
import { oncePromise } from '../../util/once';

export default class File {

  constructor(owner, { files, name, type }) {
    setOwner(this, owner);
    let components = name.split('/');
    this.files = files;
    this.name = name;
    this.type = type;
    this.filename = lastObject(components);
    this.directory = components.slice(0, -1).join('/');
  }

  _load() {}
  _metadata() {}

  @oncePromise
  async load() {
    await this.files._loadModel(this);
    return this;
  }

}
