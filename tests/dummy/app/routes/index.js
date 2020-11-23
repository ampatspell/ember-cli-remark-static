import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {

  @service
  markdown

  model() {
    return this.markdown.load('index');
  }

}
