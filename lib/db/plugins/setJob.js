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
 *     job_key  : String
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
        return deferred.reject('Expected "payload" to be type Object. Instead received ' + typeof payload);
    }

    var jobRef = this.push(payload, returnJobKey);

    /**
     * [returnJobKey description]
     *
     * attach job_key to payload to be used
     * for updateJob when getResource completes
     * 
     * @param  {Error} err Firbase Insert ERror
     * @return {undefined}
     */
    function returnJobKey(err) {

        if (err) {
            return deferred.reject(err);
        }

        payload.job_key = jobRef.key;
        deferred.resolve(payload);
    }

    return deferred.promise;
};