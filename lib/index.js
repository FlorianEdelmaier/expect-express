'use strict';
const expect = require('expect');
const expressGuards = require('./expressGuards');
const expressHelper = require('./expressHelper');
const mockHelper = require('./mockHelper');

function toBeAnExpressRouter(router) {
    expect(expressGuards.isRouter(router)).toEqual(true, `Expected ${router} to be an instance of express.Router`);
};

function toBeAnExpressRoute(route) {
    expect(route).toExist(`Expected ${route} to be an express route`)
    expect(expressGuards.isRoute(route)).toEqual(true, `Expected ${route} to be an express route`);
};

function toBeAMiddlware(mw) {
    expect(expressGuards.isMiddleware(mw)).toEqual(true, `Expected ${mw} to be a middleware function`);
};

function toHaveRoute(verb, path) {
    toBeAnExpressRouter(this.actual);
    const route = expressHelper.getSubRoute(this.actual, verb, path);
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

function toRespondWith(requestDef, expectedStatus, expectedResponse) {
    toBeAMiddlware(this.actual);
    const params = mockHelper.getMockMiddlewareParam(requestDef.verb,
        requestDef.url,
        requestDef.payloadType,
        requestDef.payload);
    this.actual(params.req, params.res, params.nextSpy);
    expect(params.res.statusCode).toEqual(expectedStatus);
    expect(JSON.parse(params.res._getData())).toEqual(expectedResponse);
};

function toHaveCalledNext(requestDef) {
    toBeAMiddlware(this.actual);
    const params = mockHelper.getMockMiddlewareParam(requestDef.verb,
        requestDef.url,
        requestDef.payloadType,
        requestDef.payload);
    this.actual(params.req, params.res, params.nextSpy);
    expect(params.nextSpy).toHaveBeenCalled();
};

function toNotHaveCalledNext(requestDef) {
    toBeAMiddlware(this.actual);
    const params = mockHelper.getMockMiddlewareParam(requestDef.verb,
        requestDef.url,
        requestDef.payloadType,
        requestDef.payload);
    this.actual(params.req, params.res, params.nextSpy);
    expect(params.nextSpy).toNotHaveBeenCalled();
};

module.exports = {
    toHaveRoute,
    toHaveRouteParameter,
    toHaveMiddleware,
    toRespondWith,
    toHaveCalledNext,
    toNotHaveCalledNext,
    helper: {
        getRoute: expressHelper.getSubRoute
    }
}
