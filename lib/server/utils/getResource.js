var q       = require('q');
var url     = require('url');
var _       = require('lodash');
var request = require('request');

/**
 * [getResource description]
 *
 *  Use request module to fetch uri contents
 *     >> if invalid URI, promise rejects and sets status "FAILED"
 *     >> else set job status to COMPLETED and attach response to "body" for update
 *
 *  Task needs to always resolve in order to properly update Job.status
 * 
 * @param  {Object}   payload [Job Object]
 * @return {Promise}          [q.promise]
 */
module.exports = function getResource(payload) {

    var deferred    = q.defer();
    var uri         = _.get(payload, 'uri');

    if (!_.isString(uri)) {
        return deferred.reject('Expected "payload" to include property "uri" as type String. Instead received ' + typeof uri);
    }

    var parsed_uri  = url.parse(uri);
    var protocol    = _.get(parsed_uri, 'protocol');

    if (_.isNull(protocol)) {
        uri = 'https://' + uri;
    }

    request.get(uri, onGetResponse);

    /**
     * [onGetResponse description]
     *
     * Set approprivate job status & body based on request response;
     * 
     * @param  {Err}    err  [Request error object]
     * @param  {Object} res  [HTTP object]
     * @param  {JSON}   body [Request body]
     * @return {Promise}     [q.promise]
     */
    function onGetResponse(err, res, body) {

        payload.status  = err ? 'FAILED'    : 'COMPLETED';
        payload.body    = err ? err.message : body;

        deferred.resolve(payload);
    }

    return deferred.promise;
};