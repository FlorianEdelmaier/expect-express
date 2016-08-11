# expect-express
[![Travis](https://img.shields.io/travis/FlorianEdelmaier/expect-express.svg)](https://travis-ci.org/FlorianEdelmaier/expect-express)
[![Codecov](https://img.shields.io/codecov/c/github/FlorianEdelmaier/expect-express.svg)](https://codecov.io/github/FlorianEdelmaier/expect-express)
[![npm](https://img.shields.io/npm/v/npm.svg?maxAge=2592000)](http://npm.im/expect-express)
[![downloads](https://img.shields.io/npm/dm/expect-express.svg?style=flat-square)](http://npm-stat.com/charts.html?package=expect-express)

test common express unit test scenarios with expect

```javascript
const router = require('express').Router();
const expect = require('expect');
const expectExpress = require('expect-express');
expect.extend(expectExpress);

router.get('/:id', () => {});

expect(router).toHaveRoute('GET', '/:id');
expect(expectExpress.getRoute(router, 'GET', '/:id')).toHaveRouteParameter('id');
```
