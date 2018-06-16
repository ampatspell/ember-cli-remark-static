import StaticIndex from 'ember-cli-remark-static/static/models/index/index';
import StaticIndexItem from 'ember-cli-remark-static/static/models/index/item';
import StaticPages from 'ember-cli-remark-static/static/models/pages/pages';
import StaticPagesPage from 'ember-cli-remark-static/static/models/pages/page';

export default {
  name: 'ember-cli-remark-static:internal',
  initialize(app) {
    app.register('remark-static:static/index', StaticIndex);
    app.register('remark-static:static/index/item', StaticIndexItem);
    app.register('remark-static:static/pages', StaticPages);
    app.register('remark-static:static/pages/page', StaticPagesPage);
  }
}
