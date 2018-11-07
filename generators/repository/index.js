const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  /**
   * @inheritDoc
   */
  install() {
    if (this.options.repositoryUrl && this.options.repositoryUrl.toLowerCase() !== 'n') {
      this.spawnCommandSync('git', ['init', '--quiet']);
      this.spawnCommandSync('git', [
        'remote',
        'add',
        'origin',
        this.options.repositoryUrl,
      ]);
    }
  }
};
