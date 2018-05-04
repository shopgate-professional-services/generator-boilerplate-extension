'use strict';
const Generator = require('yeoman-generator');
const remote = require('yeoman-remote');

module.exports = class extends Generator {
  async prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'organization',
        message: 'Please name your organization:',
        default: 'shopgate'
      },
      {
        type: 'input',
        name: 'extensionName',
        message: 'Please name your extension:'
      },
      {
        type: 'confirm',
        name: 'repositoryAvailable',
        message: 'Do you already have a git repository for the extension?:'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;

      this.composeWith(require.resolve('../repository'), {
        repositoryAvailable: this.props.repositoryAvailable
      });

      this.config = {
        extension: {
          organization: this.props.extensionName,
          name: this.props.organization,
          licence: 'UNLICENSED' // ["Apache-2.0", "UNLICENSED"]
        },
        frontend: {
          active: true,
          tests: true,
          lint: true,
          'dependency-checker': true
        },
        backend: {
          active: true,
          tests: true,
          lint: true,
          'dependency-checker': true
        },
        'pre-commit': true,
        travis: {
          active: true,
          'slack-secure-key': ''
        }
      };
    });
  }

  writing() {
    const done = this.async();
    remote(
      'https://github.com/Menes1337/cloud-sdk-boilerplate-extension/archive/master.tar.gz',
      (err, cachePath) => {
        this.fs.copy(
          cachePath + '/**/*',
          this.destinationPath(
            `extensions/${this.props.organization}-${this.props.extensionName}`
          )
        );
        this.fs.copy(
          cachePath + '/.*',
          this.destinationPath(
            `extensions/${this.props.organization}-${this.props.extensionName}`
          )
        );

        const extensionPath = this.destinationPath(
          `extensions/${this.props.organization}-${this.props.extensionName}/`
        );

        this.fs.copyTpl(
          extensionPath + 'extension/package.json',
          extensionPath + 'extension/package.json',
          this.config
        );
        this.fs.copyTpl(
          extensionPath + 'frontend/package.json',
          extensionPath + 'frontend/package.json',
          this.config
        );
        this.fs.copyTpl(
          extensionPath + 'pipelines/awesomeOrganization.awesomePipeline.v1.json',
          extensionPath +
            'pipelines/' +
            this.config.extension.organization +
            '.awesomePipeline.json',
          this.config
        );
        this.fs.delete(
          extensionPath + 'pipelines/awesomeOrganization.awesomePipeline.v1.json'
        );

        this.fs.copyTpl(
          extensionPath + '.travis.yml',
          extensionPath + '.travis.yml',
          this.config
        );
        this.fs.copyTpl(
          extensionPath + 'README.md',
          extensionPath + 'README.md',
          this.config
        );
        this.fs.copyTpl(
          extensionPath + 'extension-config.json',
          extensionPath + 'extension-config.json',
          this.config
        );

        if (this.config.extension.licence === 'UNLICENSED') {
          this.fs.delete(extensionPath + 'LICENSE.md');
        }
        done();
      },
      false
    );
  }

  install() {
    console.log('install mail generator');
    process.chdir(`./extensions/${this.props.organization}-${this.props.extensionName}`);

    process.chdir(`./extension/`);

    this.spawnCommandSync('npm', ['i']);

    process.chdir(`../frontend/`);

    this.spawnCommandSync('npm', ['i']);
  }
};
