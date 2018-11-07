const Generator = require('yeoman-generator');

/**
 * @abstract
 */
module.exports = class extends Generator {
  /**
   * Prompting phase
   */
  prompting() {
    this.log('test prompting');
  }

  /**
   * Writing phase
   */
  writing() {
    this.log('test writing');
  }
};
