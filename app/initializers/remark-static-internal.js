import Page from 'ember-cli-remark-static/static/page';

export default {
  name: 'ember-cli-remark-static:internal',
  initialize(app) {
    app.register('remark-static:static/page', Page);
  }
}
