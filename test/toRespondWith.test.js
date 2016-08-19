'use strict';
const router = require('express').Router();
const expect = require('expect');
const expectExpress = require('./../lib/index');
expect.extend(expectExpress);

const mwCheckBody = (req, res, next) => {
    if(req.body.test === 'invalid') res.status(400).json({errors: [{message: 'test error'}]});
    else res.status(200).json({success: true});
};

describe('toRespondWith', () => {
    it('should be valid if 400 response is expected', () => {
        const reqDefinition = {
            verb: 'POST',
            url: '/',
            payloadType: 'body',
            payload: { test: 'invalid' }
        };
        expect(() => {
            expect(mwCheckBody).toRespondWith(reqDefinition, 400, {errors: [{message: 'test error'}]});
        }).toNotThrow();
    });
    it('should be valid if 200 response is expected', () => {
        const reqDefinition = {
            verb: 'POST',
            url: '/',
            payloadType: 'body',
            payload: { test: 'valid' }
        };
        expect(() => {
            expect(mwCheckBody).toRespondWith(reqDefinition, 200, {success: true});
        }).toNotThrow();
    });
    it('should throw if response does not match', () => {
        const reqDefinition = {
            verb: 'POST',
            url: '/',
            payloadType: 'body',
            payload: { test: 'invalid' }
        };
        expect(() => {
            expect(mwCheckBody).toRespondWith(reqDefinition, 200, {success: true});
        }).toThrow();
    });
});
