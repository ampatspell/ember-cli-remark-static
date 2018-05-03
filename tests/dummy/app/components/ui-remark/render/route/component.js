import Component from 'ember-cli-remark-static/components/ui-remark/render/a/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';

export default Component.extend({
  classNameBindings: [ 'isIndex:index' ],

  router: service(),

  isIndex: equal('node.properties.routeName', 'index'),

  href: computed('node.properties.routeName', function() {
    let router = this.get('router');
    let routeName = this.get('node.properties.routeName');
    let id = this.get('node.properties.id');
    if(id) {
      return router.urlFor(routeName, id);
    }
    return router.urlFor(routeName);
  }).readOnly(),

  click(e) {
    e.preventDefault();
    let routeName = this.get('node.properties.routeName');
    let id = this.get('node.properties.id');
    let router = this.get('router');
    if(id) {
      router.transitionTo(routeName, id);
    } else {
      router.transitionTo(routeName);
    }
  }

});
