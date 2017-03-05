'use strict';
const expect = require('expect');
const router = require('express').Router();
const helper = require('./../lib/mockHelper');

describe('Mock helper', () => {
    describe('getMockRequest', () => {
        it('should return GET request object with params', () => {
            const req = helper.getMockRequest('GET', '/test/:id', 'params', {id: 1});
            expect(req).toBeAn('object');
            expect(req.method).toEqual('GET');
            expect(req.url).toEqual('/test/:id');
            expect(req.params).toEqual({id: 1});
        });
        it('should return GET request object with query string', () => {
            const req = helper.getMockRequest('GET', '/test', 'query', {id: 1});
            expect(req).toBeAn('object');
            expect(req.method).toEqual('GET');
            expect(req.url).toEqual('/test');
            expect(req.query).toEqual({id: 1});
        });
        it('should return GET request without any payload', () => {
            const req = helper.getMockRequest('GET', '/test');
            expect(req).toBeAn('object');
            expect(req.method).toEqual('GET');
            expect(req.url).toEqual('/test');
            //expect(req.query).toEqual({});
            expect(req.params).toEqual({});
        });
        it('should return POST request object', () => {
            const req = helper.getMockRequest('POST', '/test', 'body', { id: 1, name: 'test' });
            expect(req).toBeAn('object');
            expect(req.method).toEqual('POST');
            expect(req.url).toEqual('/test');
            expect(req.body).toEqual({ id: 1, name: 'test' });
        });
        it('should return PUT request object', () => {
            const req = helper.getMockRequest('PUT', '/xxx', 'body', { id: 1, name: 'test' });
            expect(req).toBeAn('object');
            expect(req.method).toEqual('PUT');
            expect(req.url).toEqual('/xxx');
            expect(req.body).toEqual({ id: 1, name: 'test'});
        });
        it('should return DELETE request object', () => {
            const req = helper.getMockRequest('DELETE', '/xxx', 'body', { id: 1 });
            expect(req).toBeAn('object');
            expect(req.method).toEqual('DELETE');
            expect(req.url).toEqual('/xxx');
            expect(req.body).toEqual({id: 1});
        });
        it('should throw error if payloadType is not supported', () => {
            expect(() =>
                helper.getMockRequest('GET', '/', 'test', {})
            ).toThrow(/is not supported/);
        });
    });
    describe('getMockResponse', () => {
        it('should return response object', () => {
            const resp = helper.getMockResponse();
            expect(resp).toBeAn('object');
            expect(resp.hasOwnProperty('statusCode')).toEqual(true);
            expect(resp._getData).toBeA('function');
        });
    });
    describe('getMockMiddleware', () => {
        it('should return req/res mock and next spy', () => {
            const mw = helper.getMockMiddlewareParam('GET', '/');
            expect(mw.req).toBeAn('object');
            expect(mw.res).toBeAn('object');
            expect(mw.nextSpy.__isSpy).toEqual(true);
        });
        it('should make next function spyable', () => {
            const mw = helper.getMockMiddlewareParam('GET', '/');
            mw.nextSpy();
            expect(mw.nextSpy).toHaveBeenCalled();
        });
    });
});
