import { module, test } from 'qunit';
import { visit, currentURL, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);

  test('has content', async function(assert) {
    await visit('/');
    assert.equal(currentURL(), '/');
    assert.equal(find('h1 a').innerText, 'ember-cli-remark-static');
  });

});
