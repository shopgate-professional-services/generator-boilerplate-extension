const Generator = require('yeoman-generator');

/**
 * Generates Shopgate required GitHub docs.
 *
 * @type {module.exports}
 */
module.exports = class extends Generator {
  /**
   * @inheritDoc
   */
  prompting() {
    this.props = {};

    return this.prompt([
      {
        type: 'confirm',
        name: 'generateDocs',
        message: 'Do you want to generate extra docs (e.x. CONTRIBUTING.md)?',
        default: true,
      },
    ]).then((props) => {
      this.props.generateDocs = props.generateDocs;
    });
  }

  /**
   * @inheritDoc
   */
  writing() {
    const extensionPath = this.destinationPath(`extensions/${this.options.config.extension.organization}-${
      this.options.config.extension.name
    }/`);

    if (!this.props.generateDocs) {
      this.fs.delete(`${extensionPath}docs/CONTRIBUTING.md`);
      this.fs.delete(`${extensionPath}docs/PULL_REQUEST_TEMPLATE.md`);
      this.fs.delete(`${extensionPath}docs/CODE_OF_CONDUCT.md`);
    }
  }
};
