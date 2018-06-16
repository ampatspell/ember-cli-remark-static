import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  markdown: service(),

  model() {
    return this.get('markdown.index').load();
  }

});
