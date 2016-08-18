'use strict';
const expect = require('expect');
const router = require('express').Router();
const guards = require('./../lib/expressGuards');
const helper = require('./../lib/expressHelper');

describe('Express Helper', () => {
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
            expect(guards.isRoute(sub.route)).toEqual(true);
        });
        it('should filter to correct POST route', () => {
            const sub = helper.getSubRoute(subRouter, 'POST', '/post');
            expect(sub).toExist();
            expect(guards.isRoute(sub.route)).toEqual(true);
        });
        it('should filter to correct PUT route', () => {
            const sub = helper.getSubRoute(subRouter, 'PUT', '/');
            expect(sub).toExist();
            expect(guards.isRoute(sub.route)).toEqual(true);
        });
        it('should filter to correct DELETE route', () => {
            const sub = helper.getSubRoute(subRouter, 'DELETE', '/del');
            expect(sub).toExist();
            expect(guards.isRoute(sub.route)).toExist();
        });
        it('should return undefined if not exist', () => {
            expect(helper.getSubRoute(subRouter, 'GET', '/xxx/test')).toNotExist();
        });
    });
});
