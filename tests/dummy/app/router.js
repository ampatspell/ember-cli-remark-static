import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

// let first = true;

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;

  // didTransition() {
  //   if(window.scrollTo && !first) {
  //     first = false;
  //     window.scrollTo(0, 0);
  //   }
  //   this._super(...arguments);
  // }

}

Router.map(function() {
  this.route('pages', { path: '/pages/*page_id' });
});
