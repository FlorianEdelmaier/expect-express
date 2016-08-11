'use strict';
const expect = require('expect');
const expressHelper = require('./expressHelper');

function toBeAnExpressRouter(router) {
    expect(expressHelper.isRouter(router)).toEqual(true, `Expected ${router} to be an instance of express.Router`);
};

function toBeAnExpressRoute(route) {
    expect(expressHelper.isRoute(route)).toEqual(true, `Expected ${route} to be an express route`);
};

function toHaveRoute(verb, path) {
    toBeAnExpressRouter(this.actual);
    const route = expressHelper.getSubRoute(this.actual, verb, path);
    expect(route).toExist(`Route ${this.actual} can not be found`);
    expect(expressHelper.isRoute(route.route, `Found ${this.actual} is no express route`));
};

function toHaveRouteParameter(paramName) {
    toBeAnExpressRoute(this.actual.route);
    expect(this.actual.keys.find(k => k.name === paramName)).toExist(`${paramName} is not defined`);
};

module.exports = {
    toHaveRoute,
    toHaveRouteParameter,
    getRoute: expressHelper.getSubRoute
}
