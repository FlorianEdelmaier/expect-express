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
    describe('getSubRoute', () => {
        let subRouter;
        before('setup', () => {
            router.get('/', () => {});
            router.post('/post', () => {});
            router.put('/', () => {});
            router.delete('/del', () => {});
            subRouter = router;
        });
        it('should filter to correct GET route', () => {
            const sub = guards.getSubRoute(subRouter, 'GET', '/');
            expect(sub).toExist();
            expect(guards.isRoute(sub.route)).toEqual(true);
        });
        it('should filter to correct POST route', () => {
            const sub = guards.getSubRoute(subRouter, 'POST', '/post');
            expect(sub).toExist();
            expect(guards.isRoute(sub.route)).toEqual(true);
        });
        it('should filter to correct PUT route', () => {
            const sub = guards.getSubRoute(subRouter, 'PUT', '/');
            expect(sub).toExist();
            expect(guards.isRoute(sub.route)).toEqual(true);
        });
        it('should filter to correct DELETE route', () => {
            const sub = guards.getSubRoute(subRouter, 'DELETE', '/del');
            expect(sub).toExist();
            expect(guards.isRoute(sub.route)).toExist();
        });
        it('should return undefined if not exist', () => {
            expect(guards.getSubRoute(subRouter, 'GET', '/xxx/test')).toNotExist();
        });
    });
});
