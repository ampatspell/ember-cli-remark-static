import { module, test } from 'qunit';
import setupServiceTest from '../helpers/setup-service-test';

module('service', function(hooks) {
  setupServiceTest(hooks);

  test('service exists', function(assert) {
    assert.ok(this.service);
  });

});
