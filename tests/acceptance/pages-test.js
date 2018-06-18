import { module, test } from 'qunit';
import { visit, currentURL, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | pages', function(hooks) {
  setupApplicationTest(hooks);

  test('custom components has content', async function(assert) {
    await visit('/pages/custom-components');
    assert.equal(currentURL(), '/pages/custom-components');
    assert.equal(find('h1 a').innerText, 'Custom components');
  });

});
