import { module, test } from 'qunit';
import setupServiceTest from '../helpers/setup-service-test';
import { A } from '@ember/array';

module('service', function(hooks) {
  setupServiceTest(hooks);

  test('service exists', function(assert) {
    assert.ok(this.service);
  });

  test('service loads root json', async function(assert) {
    const load = async (name, condition) => {
      let json = await this.service.loadJSON(name);
      assert.ok(condition(json));
    };
    const hasIndex = json => A(json).findBy('id', 'index');
    await load('_index', hasIndex);
    await load('/_index', hasIndex);
    await load('_index/', hasIndex);
    await load('/_index/', hasIndex);
  });

  test('service loads nested json', async function(assert) {
    const load = async (name, condition) => {
      let json = await this.service.loadJSON(name);
      assert.ok(condition(json));
    };
    const hasContent = json => json.frontmatter.title === 'tests - index';
    await load('tests/index', hasContent);
    await load('/tests/index', hasContent);
    await load('/tests/index/', hasContent);
    await load('tests/index/', hasContent);
  });

});
