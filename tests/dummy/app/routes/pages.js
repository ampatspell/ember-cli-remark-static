import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {

  @service
  markdown

  model({ page_id: id }) {
    return this.markdown.load(id);
  }

}
