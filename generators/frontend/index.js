'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    this.props = {};

    return this.prompt([
      {
        type: 'confirm',
        name: 'generate',
        message: 'Do you want to generate the frontend boilerplate?'
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
      this.fs.delete(extensionPath + 'frontend/**/*');
      return;
    }

    this.fs.copyTpl(
      extensionPath + 'frontend/package.json',
      extensionPath + 'frontend/package.json',
      this.options.config
    );
  }
};
