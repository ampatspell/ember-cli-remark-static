import { module, test } from 'qunit';
import setupServiceTest from '../helpers/setup-service-test';

module('service', function(hooks) {
  setupServiceTest(hooks);

  test('service exists', function(assert) {
    assert.ok(this.service);
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

  test('service loads index', async function(assert) {
    let content = this.service.get('content');

    assert.deepEqual(content.getProperties('id', 'name', 'parent'), {
      id: null,
      name: null,
      parent: null
    });

    let page = content.page('tests/articles/02-two');

    assert.deepEqual(page.getProperties('id', 'name', 'parent.id'), {
      id: 'tests/articles/02-two',
      name: '02-two',
      'parent.id': 'tests/articles'
    });
  });

  test('load page content', async function(assert) {
    let page = await this.service.load('tests/index');
    assert.deepEqual(page.getProperties('id', 'name'), {
      id: 'tests/index',
      name: 'index'
    });
  });

  test('load missing page', async function(assert) {
    try {
      await this.service.load('tests/foobar');
    } catch(err) {
      assert.equal(err.code, 'not-found');
    }
  });

});
