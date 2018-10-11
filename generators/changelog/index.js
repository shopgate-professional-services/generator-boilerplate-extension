'use strict';
const Generator = require('yeoman-generator');

/**
 * Generates CHANGELOG.md.
 *
 * @type {module.exports}
 */
module.exports = class extends Generator {
  prompting() {
    this.props = {};

    return this.prompt([
      {
        type: 'confirm',
        name: 'generateChangelog',
        message: 'Do you want to generate CHANGELOG.md?',
        default: true
      }
    ]).then(props => {
      this.props.generateChangelog = props.generateChangelog;
    });
  }

  writing() {
    const extensionPath = this.destinationPath(
      `extensions/${this.options.config.extension.organization}-${
        this.options.config.extension.name
      }/`
    );

    if (!this.props.generateChangelog) {
      this.fs.delete(extensionPath + 'CHANGELOG.md');
    }
  }
};
