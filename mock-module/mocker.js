// CommonJS works by wrapping each file in a function like this:
// (function (exports, require, module, __filename, __dirname) { ... });
// require is then available as a variable in that scope.
//
// The module system can be customized by modifying Module.prototype.require.

// Issues with ES Module support:
// - This mocking approach only works for CommonJS modules. ES Modules are imported at
//  parse time, so this method cannot intercept those imports. This is why testing frameworks
// like Jest have experimental support for ES Module mocking.

// Node.js provides an experimental loader API for ES Modules which Jest uses under the hood.

const Module = require("module");

const mockedModules = new Map();

const mock = (moduleName, mockImplementation) => {
  mockedModules.set(moduleName, mockImplementation);
};

// Prototypes allow you to define shared properties and methods for all instances of a particular
// you to define shared properties and methods for all instances of a particular
// type of object.
// Here, we are modifying the require method of the Module prototype to
// implement our mocking functionality.
// You can read more about prototypes here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
Module.prototype.require = function (moduleName) {
  if (mockedModules.has(moduleName)) {
    return mockedModules.get(moduleName);
  }
  return require(this, moduleName);
};

module.exports = { mock };
