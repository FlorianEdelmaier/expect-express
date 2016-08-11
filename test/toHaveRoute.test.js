'use strict';
const expect = require('expect');
const expectExpress = require('./../lib/index');
const router = require('express').Router();
expect.extend(expectExpress);

describe('toHaveRoute', () => {
    before('setup', () => {
        router.get('/', () => {});
        router.post('/test', () => {});
    });
    it('should pass if route defined', () => {
        expect(() => {
            expect(router).toHaveRoute('POST', '/test');
        }).toNotThrow();
    });
    it('should fail if route not found', () => {
        expect(() => {
            expect(router).toHaveRoute('GET', '/test');
        }).toThrow(/can not be found/);
    });
    it('should fail if input is no router', () => {
        expect(() => {
            expect({}).toHaveRoute('GET', '/');
        }).toThrow(/to be an instance of express.Router/);
    });
});
