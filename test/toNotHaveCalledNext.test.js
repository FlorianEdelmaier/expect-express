'use strict';
const router = require('express').Router();
const expect = require('expect');
const expectExpress = require('./../lib/index');
expect.extend(expectExpress);

const mwCheckBody = (req, res, next) => {
    if(req.body.test === 'invalid') res.status(400).json({errors: [{message: 'test error'}]});
    else next();
};

describe('toNotHaveNextCalled', () => {
    it('should throw error if expectation is not tested against middlware', () => {
        const reqDefinition = {
            verb: 'POST',
            url: '/',
            payloadType: 'body',
            payload: { test: 'valid' }
        };
        expect(() => {
            expect(() => {}).toNotHaveCalledNext(reqDefinition)
        }).toThrow(/to be a middleware/);
    });
    it('should be valid if next is not triggered', () => {
        const reqDefinition = {
            verb: 'POST',
            url: '/',
            payloadType: 'body',
            payload: { test: 'invalid' }
        };
        expect(() => {
            expect(mwCheckBody).toNotHaveCalledNext(reqDefinition);
        }).toNotThrow();
    });
    it('should throw error if next is called', () => {
        const reqDefinition = {
            verb: 'POST',
            url: '/',
            payloadType: 'body',
            payload: { test: 'valid' }
        };
        expect(() => {
            expect(mwCheckBody).toNotHaveCalledNext(reqDefinition);
        }).toThrow();
    });
});
