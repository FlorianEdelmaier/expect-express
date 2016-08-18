'use strict';
const expect = require('expect');
const router = require('express').Router();
const guards = require('./../lib/expressGuards');

describe('Express Guards', () => {
    describe('isRouter', () => {
        it('should validate express.Router', () => {
            let route = router.get('/', () => {});
            expect(guards.isRouter(route)).toEqual(true);
        });
        it('should reject plain objects', () => {
            expect(guards.isRouter({})).toEqual(false);
        });
    });
    describe('isRoute', () => {
        it('should validate sub routes', () => {
            let routerTest = router.get('/', () => {});
            expect(guards.isRoute(router.stack[0].route)).toEqual(true);
        });
        it('should reject plain objects', () => {
            expect(guards.isRoute({ path: '/' })).toEqual(false);
        });
    });
    describe('isMiddleware', () => {
        it('should validate middleware functions', () => {
            expect(guards.isMiddleware((res, req, next) => {})).toEqual(true);
        });
        it('should fail if middleware is no function', () =>  {
            expect(guards.isMiddleware({})).toEqual(false);
        });
        it('should fail if middleware does not accept 3 args', () => {
            expect(guards.isMiddleware((res) => {})).toEqual(false);
        });
    });
});
