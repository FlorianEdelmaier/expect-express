'use strict';
const router = require('express').Router();
const expect = require('expect');
const expectExpress = require('./../lib/index');
expect.extend(expectExpress);

describe('toHaveRouteParameter', () => {
    before('setup', () => {
        router.get('/:id', () => {});
        router.post('/test', () => {});
    });
    it('should fail if input is no route', () => {
        expect(() => {
            expect(expectExpress.getRoute(router, 'DELETE', '/:id')).toHaveRouteParameter('id');
        }).toThrow();
    });
    it('should fail if parameter not defined', () => {
        expect(() => {
            expect(expectExpress.getRoute(router, 'GET', '/:id')).toHaveRouteParameter('test');
        }).toThrow(/is not defined/);
    });
    it('should pass if parameter is defined', () => {
        expect(() => {
            expect(expectExpress.getRoute(router, 'GET', '/:id')).toHaveRouteParameter('id');
        }).toNotThrow();
    });
});
