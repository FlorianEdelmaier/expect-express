'use strict';
const httpMocks = require('node-mocks-http');
const expect = require('expect');

const getMockPostRequest = (url, body) => {
    return httpMocks.createRequest({
        method: 'POST',
        url: url,
        body: body
    });
};

const getMockGetRequest = (url, parameters) => {
    return httpMocks.createRequest({
        method: 'GET',
        url: url,
        params: parameters
    });
};

const getMockResponse = () => {
    return httpMocks.createResponse();
};

const getMockGetMiddleware = (url, parameters) => {
    return {
        req: getMockGetRequest(url, parameters),
        res: getMockResponse(),
        nextSpy: expect.createSpy()
    };
};

const getMockPostMiddleware = () => {
    return {
        req: getMockPostRequest(url, body),
        res: getMockResponse(),
        nextSpy: expect.createSpy()
    };
};

module.exports = {
    getMockPostRequest: getMockPostRequest,
    getMockGetRequest: getMockGetRequest,
    getMockResponse: getMockResponse,
    getMockGetMiddleware: getMockGetMiddleware,
    getMockPostMiddleware: getMockPostMiddleware

}
