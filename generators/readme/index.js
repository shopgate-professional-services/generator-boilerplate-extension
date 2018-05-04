'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    this.props = {};

    return this.prompt([
      {
        type: 'confirm',
        name: 'generate',
        message: 'Do you want to generate a README.md?'
      }
    ]).then(props => {
      this.props.generate = props.generate;
    });
  }

  writing() {
    const extensionPath = this.destinationPath(
      `extensions/${this.options.config.extension.organization}-${
        this.options.config.extension.name
      }/`
    );

    if (!this.props.generate) {
      this.fs.delete(extensionPath + 'README.md');
      return;
    }

    this.fs.copyTpl(
      extensionPath + 'README.md',
      extensionPath + 'README.md',
      this.options.config
    );
  }
};
