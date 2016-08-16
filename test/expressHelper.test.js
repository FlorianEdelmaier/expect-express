'use strict';
const expect = require('expect');
const router = require('express').Router();
const helper = require('./../lib/expressHelper');

describe('Helper', () => {
    describe('isRouter', () => {
        it('should validate express.Router', () => {
            let route = router.get('/', () => {});
            expect(helper.isRouter(route)).toEqual(true);
        });
        it('should reject plain objects', () => {
            expect(helper.isRouter({})).toEqual(false);
        });
    });
    describe('isRoute', () => {
        it('should validate sub routes', () => {
            let routerTest = router.get('/', () => {});
            expect(helper.isRoute(router.stack[0].route)).toEqual(true);
        });
        it('should reject plain objects', () => {
            expect(helper.isRoute({ path: '/' })).toEqual(false);
        });
    });
    describe('isMiddleware', () => {
        it('should validate middleware', () => {
            expect(helper.isMiddleware((res, req, next) => {})).toEqual(true);
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
            const sub = helper.getSubRoute(subRouter, 'GET', '/');
            expect(sub).toExist();
            expect(helper.isRoute(sub.route)).toEqual(true);
        });
        it('should filter to correct POST route', () => {
            const sub = helper.getSubRoute(subRouter, 'POST', '/post');
            expect(sub).toExist();
            expect(helper.isRoute(sub.route)).toEqual(true);
        });
        it('should filter to correct PUT route', () => {
            const sub = helper.getSubRoute(subRouter, 'PUT', '/');
            expect(sub).toExist();
            expect(helper.isRoute(sub.route)).toEqual(true);
        });
        it('should filter to correct DELETE route', () => {
            const sub = helper.getSubRoute(subRouter, 'DELETE', '/del');
            expect(sub).toExist();
            expect(helper.isRoute(sub.route)).toExist();
        });
        it('should return undefined if not exist', () => {
            expect(helper.getSubRoute(subRouter, 'GET', '/xxx/test')).toNotExist();
        });
    });
});
