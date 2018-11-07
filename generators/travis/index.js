const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  /**
   * @inheritDoc
   */
  prompting() {
    this.props = {};

    return this.prompt([
      {
        type: 'confirm',
        name: 'generateTravis',
        message: 'Do you want to generate .travis.yml?',
        default: false,
      },
    ]).then((props) => {
      this.props.generateTravis = props.generateTravis;
    });
  }
  /**
   * @inheritDoc
   */
  writing() {
    const extensionPath = this.destinationPath(`extensions/${this.options.config.extension.organization}-${
      this.options.config.extension.name
    }/`);

    if (!this.props.generateTravis) {
      this.fs.delete(`${extensionPath}.travis.yml`);
      return;
    }

    this.fs.copyTpl(
      `${extensionPath}.travis.yml`,
      `${extensionPath}.travis.yml`,
      this.options.config
    );
  }
};
