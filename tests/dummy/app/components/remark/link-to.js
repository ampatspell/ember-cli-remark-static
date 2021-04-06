import Component from '@glimmer/component';
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { reads } from "macro-decorators";

export default class RemarkLinkToComponent extends Component {

  @service router;

  @reads('args.model') model;

  get url() {
    let { router, model: { route, model } } = this;
    if(model) {
      return router.urlFor(route, model);
    } else {
      return router.urlFor(route);
    }
  }

  @action
  transitionTo(e) {
    if(e.metaKey) {
      return;
    }
    e.preventDefault();
    let { router, model: { route, model } } = this;
    if(model) {
      router.transitionTo(route, model);
    } else {
      router.transitionTo(route);
    }
  }

}
