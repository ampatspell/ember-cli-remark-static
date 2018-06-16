import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  markdown: service(),

  model(params) {
    return this.get('markdown.pages').load(params.page_id);
  }

});
