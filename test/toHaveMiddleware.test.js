'use strict';
const expect = require('expect');
const expectExpress = require('./../lib/index');
const router = require('express').Router();
expect.extend(expectExpress);

function namedMiddleware1(req, res, next) {
    next();
};
function namedMiddleware2(req, res, next) {
    next();
};

describe('toHaveMiddleware', () => {
    before('setup', () => {
        router.get('/', (req, res, next) => {}, () => {});
        router.post('/test', namedMiddleware1, namedMiddleware2, () => {});
        router.put('/', () => {});
    });
    it('should fail if input is no route', () => {
        expect(() => {
            expect(expectExpress.getRoute(router, 'DELETE', '/:id')).toHaveMiddleware();
        }).toThrow(/is undefined/);
    });
    it('should fail if not middleware defined', () => {
        expect(() => {
            expect(expectExpress.getRoute(router, 'PUT', '/')).toHaveMiddleware();
        }).toThrow(/No middleware found/);
    });
    it('should pass without parameter if middleware is anonymous function', () => {
        expect(() => {
            expect(expectExpress.getRoute(router, 'GET', '/')).toHaveMiddleware();
        }).toNotThrow();
    });
    it('should find middleware by name', () => {
        expect(() => {
            expect(expectExpress.getRoute(router, 'POST', '/test')).toHaveMiddleware('namedMiddleware1');
        }).toNotThrow();
    });
    it('shoudl find named middleware even if more than one defined', () => {
        expect(() => {
            expect(expectExpress.getRoute(router, 'POST', '/test')).toHaveMiddleware('namedMiddleware2');
        }).toNotThrow();
    });
});
