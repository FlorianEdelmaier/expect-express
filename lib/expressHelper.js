'use strict';

module.exports.isRouter = router => router.name === 'router';

module.exports.isRoute = route => route.hasOwnProperty('stack') &&
    route.hasOwnProperty('path') &&
    route.hasOwnProperty('methods');

module.exports.getSubRoute = (router, verb, path) => {
    const subroutes = router.stack.filter(r => r.route.path === path &&
        r.route.methods[verb.toLowerCase()] === true);
    return subroutes.length > 0 ? subroutes[0] : undefined;
};
