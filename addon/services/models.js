import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';

export default class ModelsService extends Service {

  create(name, ...args) {
    let owner = getOwner(this);
    let factory = owner.factoryFor(`model:${name}`)?.class;
    assert(`Model '${name}' is not registered`, !!factory);
    return new factory(owner, ...args);
  }

}
