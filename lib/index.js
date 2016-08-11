'use strict';
const expect = require('expect');
const expressHelper = require('./expressHelper');

function toBeAnExpressRouter(router) {
    expect(expressHelper.isRouter(router)).toEqual(true, `Expected ${router} to be an instance of express.Router`);
};

function toBeAnExpressRoute(route) {
    expect(expressHelper.isRoute(route)).toEqual(true, `Expected ${route} to ba an express route`);
};

function toHaveRoute(verb, path) {
    toBeAnExpressRouter(this.actual);
    const route = expressHelper.getSubRoute(this.actual, verb, path);
    expect(route).toExist();
    expect(expressHelper.isRoute(route.route));
};

function toHaveRouteParameter(paramName) {
    toBeAnExpressRoute(this.actual.route);
    expect(this.actual.keys.includes(paramName)).toEqual(true);
};

module.exports = {
    toHaveRoute,
    toHaveRouteParameter
}
