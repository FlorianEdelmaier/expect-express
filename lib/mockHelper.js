'use strict';
const httpMocks = require('node-mocks-http');
const expect = require('expect');

const allowedPayloadTypes = [undefined, 'params', 'body', 'query'];

const getMockRequest = (verb, url, payloadType, payload) => {
    const type = payloadType ? payloadType.toLowerCase() : undefined;
    if(allowedPayloadTypes.indexOf(type) === -1) throw new Error(`Payload type ${type} is not supported`);
    let req = httpMocks.createRequest({
        method: verb.toUpperCase(),
        url: url
    });
    if(type) req[type] = payload;
    return req;
};

const getMockResponse = () => {
    return httpMocks.createResponse();
};

const getMockMiddlewareParam = (verb, url, payloadType, payload) => {
    return {
        req: getMockRequest(verb, url, payloadType, payload),
        res: getMockResponse(),
        nextSpy: expect.createSpy()
    };
};

module.exports = {
    getMockRequest,
    getMockResponse,
    getMockMiddlewareParam

}
