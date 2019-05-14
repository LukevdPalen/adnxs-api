/* eslint no-undef: off */

module.exports = function () {
  global.expect = global.chai.expect;

  let sandbox;

  beforeEach(() => {
    sandbox = global.sinon.sandbox.create();
    global.stub = sandbox.stub.bind(sandbox);
    global.spy = sandbox.spy.bind(sandbox);
  });

  afterEach(() => {
    delete global.stub;
    delete global.spy;
    sandbox.restore();
  });
};
