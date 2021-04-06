import Service from '@ember/service';
import { getOwner } from '@ember/application';
import fetch from 'fetch';
import { oncePromise } from '../util/once';

const isProduction = caller => {
  let config = getOwner(caller).factoryFor('config:environment').class
  return config.environment === 'production';
};

export default class AssetMapService extends Service {

  didLoad(json) {
    this.json = json;
  }

  @oncePromise
  async load() {
    if(!isProduction(this)) {
      this.didLoad(null);
      return;
    }

    let res = await fetch('/assets/assetMap.json');
    if(res.status === 404) {
      throw new Error('assetMap.json was not found');
    }

    let json = await res.json();
    this.didLoad(json);
  }

  resolve(name) {
    let { json } = this;
    if(json) {
      name = json.assets[name] || name;
    }
    return `/${name}`;
  }

}
