# expect-express
[![Travis](https://img.shields.io/travis/FlorianEdelmaier/expect-express.svg)](https://travis-ci.org/FlorianEdelmaier/expect-express)
[![Codecov](https://img.shields.io/codecov/c/github/FlorianEdelmaier/expect-express.svg)](https://codecov.io/github/FlorianEdelmaier/expect-express)
[![npm](https://img.shields.io/npm/v/npm.svg?maxAge=2592000)](http://npm.im/expect-express)
[![downloads](https://img.shields.io/npm/dm/expect-express.svg?style=flat-square)](http://npm-stat.com/charts.html?package=expect-express)

check common express unit test scenarios with expect

* setup your imports and configure expect-express
```javascript
const router = require('express').Router();
const expect = require('expect');
const expectExpress = require('expect-express');
expect.extend(expectExpress);
```
* define your system under test
```javascript
function responseMiddlware(req, res, next) {
    res.status(200).json({success: true});
}
function namedMiddleware(req, res, next) {
    next();
}

router.get('/:id', namedMiddleware, (req, res, next) => { next(); }, () => {});
```
* test if a route is defined by specifying an HTTP verb and a path
```javascript
expect(router).toHaveRoute('GET', '/:id');
```
* test if a given route has params defined
    getRoute helper methods facilitates route selection
```javascript
expect(expectExpress.helper.getRoute(router, 'GET', '/:id')).toHaveRouteParameter('id');
```
* test if specific middleware (name or anonymous) is defined for given route
```javascript
expect(expectExpress.helper.getRoute(router, 'GET', '/:id')).toHaveMiddleware('namedMiddleware');
expect(expectExpress.helper.getRoute(router, 'GET', '/:id')).toHaveMiddleware();
```
* test if middleware function returns expected response
```javascript
const reqDefinition = {
    verb: 'POST',
    url: '/',
    payloadType: 'body',
    payload: { test: 'valid' }
};
expect(responseMiddleware).toRespondWith(reqDefinition, 200, {success: true});
```
* test if next was called in middleware
```javascript
expect(namedMiddleware).toHaveCalledNext(reqDefinition);
```
