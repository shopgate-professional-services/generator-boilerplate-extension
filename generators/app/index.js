'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const remote = require('yeoman-remote');

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../tests'));
    this.composeWith(require.resolve('../lint'));
    this.composeWith(require.resolve('../dependency-checker'));
    this.composeWith(require.resolve('../pre-commit'));
    this.composeWith(require.resolve('../travis'));
  }

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
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const done = this.async();
    remote(
      'https://github.com/Menes1337/cloud-sdk-boilerplate-extension/archive/master.tar.gz',
      (err, cachePath) => {
        this.log(cachePath);
        this.fs.copy(
          cachePath,
          this.destinationPath(
            `extensions/${this.props.organization}-${this.props.extensionName}`
          )
        );

        done();
      },
      false
    );
  }

  install() {
    process.chdir(`./extensions/${this.props.organization}-${this.props.extensionName}`);

    const config = {
      extension: {
        organization: this.props.organization,
        name: this.props.extensionName,
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

    this.fs.copyTpl('extension/package.json', 'extension/package.json', config);
    this.fs.copyTpl('frontend/package.json', 'frontend/package.json', config);
    this.fs.copyTpl(
      'pipelines/awesomeOrganization.awesomePipeline.v1.json',
      'pipelines/' + config.extension.organization + '.awesomePipeline.json',
      config
    );
    this.fs.delete('pipelines/awesomeOrganization.awesomePipeline.v1.json');

    // This.fs.copyTpl('.travis.yml', '.travis.yml', config);
    this.fs.copyTpl('README.md', 'README.md', config);
    this.fs.copyTpl('extension-config.json', 'extension-config.json', config);

    if (config.extension.licence === 'UNLICENSED') {
      this.fs.delete('LICENSE.md');
    }

    this.spawnCommandSync('git', ['init', '--quiet']);

    this.installDependencies({ npm: true, bower: false });
  }
};
