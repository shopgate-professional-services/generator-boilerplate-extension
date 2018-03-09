'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../tests'));
    this.composeWith(require.resolve('../lint'));
    this.composeWith(require.resolve('../dependency-checker'));
    this.composeWith(require.resolve('../pre-commit'));
    this.composeWith(require.resolve('../travis'));
  }

  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Great decission to start our ${chalk.red('boilerplate-extension')} generator!`)
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  }

  install() {
    this.installDependencies();
  }
};
