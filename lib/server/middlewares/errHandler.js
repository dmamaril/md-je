/**
 * [errHandler description]
 *
 * Used as a middleware to catch all errors and respond to user accordingly;
 * 
 * @param  {Error}    err  [Erorr Object]
 * @param  {Object}   req  [Request HTTP Object]
 * @param  {Object}   res  [Response HTTP Object]
 * @param  {Function} next [Express Middleware Fn]
 * @return {undefined}
 */
module.exports = function errHandler(err, req, res, next) {
    res.status(err.status).send(err.message);
};