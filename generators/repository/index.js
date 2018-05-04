'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    this.props = {};

    if (!this.options.repositoryAvailable) {
      return;
    }

    return this.prompt([
      {
        type: 'input',
        name: 'repositoryUrl',
        message: 'Please enter your repository url: '
      }
    ]).then(props => {
      this.props.repositoryUrl = props.repositoryUrl;
    });
  }

  install() {
    if (this.props.repositoryUrl) {
      this.spawnCommandSync('git', ['init', '--quiet']);
      this.spawnCommandSync('git', ['remote', 'add', 'origin', this.props.repositoryUrl]);
    }
  }
};
