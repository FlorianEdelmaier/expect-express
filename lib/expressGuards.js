'use strict';

module.exports.isRouter = router => router.name === 'router';

module.exports.isRoute = route =>
    route !== undefined &&
    route.hasOwnProperty('stack') &&
    route.hasOwnProperty('path') &&
    route.hasOwnProperty('methods');

// naive implementation
module.exports.isMiddleware = fun =>
    typeof fun === 'function' &&
    fun.length === 3;
