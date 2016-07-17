var q = require('q');
var _ = require('lodash');

/**
 * [setJob description]
 *
 * StatusEnums = ['PENDING', 'FAILED', 'COMPLETED'];
 * 
 * Job = {
 *     status   : StatusEnums,
 *     uri      : String,
 *     body     : String,
 *     job_id   : String
 * };
 *
 * assign firebase push to variable to access its key upon completion
 * 
 * @param  {Object}     payload     [Job Object]
 * @return {Promise}                [q.promise]
 */
module.exports = function setJob(payload) {

    var deferred = q.defer();

    if (!_.isObject(payload) || _.isNull(payload)) {
        return deferred.reject(new Error('Expected "payload" to be type Object. Instead received ' + typeof payload));
    }

    var rootRef     = this;
    var jobRef      = rootRef.push(payload, pushToQueueAndResolveId);

    /**
     * [pushToQueueAndResolveId description]
     *
     * attach job_id to payload to be used
     * for updateJob when getResource completes
     * 
     * @param  {Error} err Firbase Insert ERror
     * @return {undefined}
     */
    function pushToQueueAndResolveId(err) {

        if (err) {
            return deferred.reject(err);
        }

        payload.job_id = jobRef.key;
        deferred.resolve(payload);
    }

    return deferred.promise;
};