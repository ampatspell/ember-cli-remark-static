import Route from '@ember/routing/route';
import { inject as service } from "@ember/service";

export default class IndexRoute extends Route {

  @service content;
  @service models;

  async model({ slug }) {
    let file = this.content.find(file => file.attributes.slug === slug);
    let page;
    if(file) {
      await file.load();
      page = this.models.create('page', { file });
    }
    return {
      slug,
      page
    };
  }

}
