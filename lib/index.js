'use strict';
const expect = require('expect');
const expressHelper = require('./expressHelper');

function toBeAnExpressRouter(router) {
    expect(expressHelper.isRouter(router)).toEqual(true, `Expected ${router} to be an instance of express.Router`);
};

function toBeAnExpressRoute(route) {
    expect(route).toExist(`Expected ${route} to be an express route`)
    expect(expressHelper.isRoute(route)).toEqual(true, `Expected ${route} to be an express route`);
};

function toHaveRoute(verb, path) {
    toBeAnExpressRouter(this.actual);
    const route = expressHelper.getSubRoute(this.actual, verb, path);
    expect(route).toExist(`Route ${this.actual} can not be found`);
    expect(expressHelper.isRoute(route.route, `Found ${this.actual} is no express route`));
};

function toHaveRouteParameter(paramName) {
    expect(this.actual).toExist('Route is undefined');
    toBeAnExpressRoute(this.actual.route);
    expect(this.actual.keys.find(k => k.name === paramName)).toExist(`${paramName} is not defined`);
};

function toHaveMiddleware(middlewareName) {
    const name = middlewareName || '<anonymous>';
    expect(this.actual).toExist('Route is undefined');
    toBeAnExpressRoute(this.actual.route);
    expect(this.actual.route.stack.length).toBeGreaterThan(1, 'No middleware found');
    expect(this.actual.route.stack.find(l => l.name === name)).toExist(`${name} is not defined`);
};

/*
const testRequestValidation = (reqParams, status, errorMsg) => {
  const URL = '/api/notifications';
  const req = mockHelper.getMockGetRequest(URL, reqParams);
  const res = mockHelper.getMockResponse();
  notificationHandler.findByUser(req, res, () => {});
  expect(res.statusCode).toEqual(status);
  const data = JSON.parse(res._getData());
  if(status !== 200) {
      expect(data.errors[0].message).toMatch(new RegExp(errorMsg));
  } else {
      expect(data.success).toEqual(true);
  }
};
 */

module.exports = {
    toHaveRoute,
    toHaveRouteParameter,
    toHaveMiddleware,
    getRoute: expressHelper.getSubRoute
}
