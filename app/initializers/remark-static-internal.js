import StaticIndex from 'ember-cli-remark-static/static/models/index/index';
import StaticIndexItem from 'ember-cli-remark-static/static/models/index/item';

export default {
  name: 'ember-cli-remark-static:internal',
  initialize(app) {
    app.register('remark-static:static/index', StaticIndex);
    app.register('remark-static:static/index/item', StaticIndexItem);
  }
}
