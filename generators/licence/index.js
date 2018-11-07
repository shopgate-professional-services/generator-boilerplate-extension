const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  /**
   * @inheritDoc
   */
  writing() {
    const extensionPath = this.destinationPath(`extensions/${this.options.config.extension.organization}-${
      this.options.config.extension.name
    }/`);

    if (this.options.config.extension.licence === 'UNLICENSED') {
      this.fs.delete(`${extensionPath}LICENSE.md`);
    }
  }
};
