import Route from '@ember/routing/route';
import { load } from '../util/page';

export default class IndexRoute extends Route {

  async model() {
    return load(this, 'index.md');
  }

}
