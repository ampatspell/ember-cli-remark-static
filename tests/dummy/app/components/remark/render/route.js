import Element from 'ember-cli-remark-static/components/remark/render/element';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class RemarkRenderRouteComponent extends Element {

  @service
  router

  get isIndex() {
    return this.args.node.properties.routeName === 'index';
  }

  get href() {
    let { router, args: { node: { properties: { routeName, id } } } } = this;
    if(id) {
      return router.urlFor(routeName, id);
    }
    return router.urlFor(routeName);
  }

  @action
  onClick(e) {
    e.preventDefault();
    let { router, args: { node: { properties: { routeName, id } } } } = this;
    if(id) {
      router.transitionTo(routeName, id);
    } else {
      router.transitionTo(routeName);
    }
  }

}
