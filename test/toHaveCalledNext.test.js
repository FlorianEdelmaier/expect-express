'use strict';
const router = require('express').Router();
const expect = require('expect');
const expectExpress = require('./../lib/index');
expect.extend(expectExpress);

const mwCheckBody = (req, res, next) => {
    if(req.body.test === 'invalid') res.status(400).json({errors: [{message: 'test error'}]});
    else next();
};

describe('toHaveNextCalled', () => {
    it('should throw error if expectation is not tested against middlware', () => {
        const reqDefinition = {
            verb: 'POST',
            url: '/',
            payloadType: 'body',
            payload: { test: 'valid' }
        };
        expect(() => {
            expect(() => {}).toHaveCalledNext(reqDefinition)
        }).toThrow(/to be a middleware/);
    });
    it('should be valid if next is called', () => {
        const reqDefinition = {
            verb: 'POST',
            url: '/',
            payloadType: 'body',
            payload: { test: 'valid' }
        };
        expect(() => {
            expect(mwCheckBody).toHaveCalledNext(reqDefinition);
        }).toNotThrow();
    });
    it('should throw error if next is not called', () => {
        const reqDefinition = {
            verb: 'POST',
            url: '/',
            payloadType: 'body',
            payload: { test: 'invalid' }
        };
        expect(() => {
            expect(mwCheckBody).toHaveCalledNext(reqDefinition);
        }).toThrow();
    });
});
