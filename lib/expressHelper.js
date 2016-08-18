'use strict';

module.exports.getSubRoute = (router, verb, path) => {
    const subroutes = router.stack.filter(r => r.route !== undefined &&
        r.route.path === path &&
        r.route.methods[verb.toLowerCase()] === true);
    return (subroutes && subroutes.length > 0) ? subroutes[0] : undefined;
};
