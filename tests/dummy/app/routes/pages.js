import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  // markdown: service(),

  model(params) {
    // return this.get('markdown').load(params.page_id);
  }

});
