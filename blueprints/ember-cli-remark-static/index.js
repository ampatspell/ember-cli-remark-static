var RSVP = require('rsvp');

module.exports = {
  normalizeEntityName() {
  },
  afterInstall() {
    return this.addAddonToProject('ember-fetch');
  }
};
