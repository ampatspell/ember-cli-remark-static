import EmberRouter from '@ember/routing/router';
import config from './config/environment';

let first = true;

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,

  didTransition() {
    if(window.scrollTo && !first) {
      first = false;
      window.scrollTo(0, 0);
    }
    this._super(...arguments);
  }

});

Router.map(function() {
  this.route('pages', { path: '/pages/*page_id' });
});

export default Router;
