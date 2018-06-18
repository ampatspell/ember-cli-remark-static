import { setupTest } from 'ember-qunit';
import StaticService from 'ember-cli-remark-static/static/service';
import { run } from '@ember/runloop';

const Service = StaticService.extend({

  identifier: 'markdown'

});

const setupServiceTest = hooks => {

  hooks.beforeEach(function() {
    this.owner.register('service:test', Service);
    this.service = this.owner.lookup('service:test');
  });

  hooks.afterEach(function() {
    run(() => this.service.destroy());
  });

}

export default hooks => {
  setupTest(hooks);
  setupServiceTest(hooks);
}
