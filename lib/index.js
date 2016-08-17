'use strict';
const expect = require('expect');
const expressGuards = require('./expressGuards');
const mockHelper = require('./mockHelper');

function toBeAnExpressRouter(router) {
    expect(expressGuards.isRouter(router)).toEqual(true, `Expected ${router} to be an instance of express.Router`);
};

function toBeAnExpressRoute(route) {
    expect(route).toExist(`Expected ${route} to be an express route`)
    expect(expressGuards.isRoute(route)).toEqual(true, `Expected ${route} to be an express route`);
};

function toBeAMiddlware(mw) {
    expect(expressGuards.isMiddleware(mw)).toEqual(true, `Expected ${mw} to be a middlware function`);
};

function toHaveRoute(verb, path) {
    toBeAnExpressRouter(this.actual);
    const route = expressGuards.getSubRoute(this.actual, verb, path);
    expect(route).toExist(`Route ${this.actual} can not be found`);
    expect(expressGuards.isRoute(route.route, `Found ${this.actual} is no express route`));
};

function toHaveRouteParameter(paramName) {
    expect(this.actual).toExist('Route is undefined');
    toBeAnExpressRoute(this.actual.route);
    expect(this.actual.keys.find(k => k.name === paramName)).toExist(`${paramName} is not defined`);
};

//TODO: omit last handler as additional middleware?
function toHaveMiddleware(middlewareName) {
    const name = middlewareName || '<anonymous>';
    expect(this.actual).toExist('Route is undefined');
    toBeAnExpressRoute(this.actual.route);
    expect(this.actual.route.stack.length).toBeGreaterThan(1, 'No middleware found');
    expect(this.actual.route.stack.find(l => l.name === name)).toExist(`${name} is not defined`);
};

function toHaveValidationError(requestDef, expectedStatus, expectedErrorMsg) {
    toBeAMiddlware(this.actual);
    const params = mockHelper.getMockMiddlewareParam(requestDef.verb,
        requestDef.url,
        requestDef.payloadType,
        requestDef.payload);
    this.actual(params.req, params.res, params.nextSpy);
    expect(params.res.statusCode).toEqual(expectedStatus);
    const data = JSON.parse(params.res._getData());
    expect(data.errors[0].message).toMatch(new RegExp(expectedErrorMsg));
};

// function toNotHaveValidationError() {
//
// };

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
    toHaveValidationError,
    helper: {
        getRoute: expressGuards.getSubRoute
    }
}
