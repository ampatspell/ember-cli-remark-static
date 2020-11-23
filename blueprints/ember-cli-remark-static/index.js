module.exports = {
  normalizeEntityName() {
  },
  async afterInstall() {
    await this.addAddonToProject('ember-fetch');
  }
};