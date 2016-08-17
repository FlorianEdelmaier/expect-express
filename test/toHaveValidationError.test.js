'use strict';
const router = require('express').Router();
const expect = require('expect');
const expectExpress = require('./../lib/index');
expect.extend(expectExpress);

const mwCheckBody = (req, res, next) => {
    if(req.body.test === 'test') res.status(400).json({errors: [{message: 'test error'}]});
    else res.status(200).json({success: true});
};

describe('toHaveValidationError', () => {
    it('should', () => {
        const reqDefinition = {
            verb: 'POST',
            url: '/',
            payloadType: 'body',
            payload: { test: 'test' }
        };
        expect(() => {
            expect(mwCheckBody).toHaveValidationError(reqDefinition, 400, 'test error');
        }).toNotThrow();
    });
});
