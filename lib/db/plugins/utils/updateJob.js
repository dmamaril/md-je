var q = require('q');
var _ = require('lodash');

/**
 * [updateJob description]
 *
 * Update job status & body in firebase db accordingly;
 * 
 * @param  {Object} payload [Job Object]
 * @return {Promise}        [q.promise]
 */
module.exports = function updateJob(payload) {

	var deferred 	= q.defer();
	var job_id 		= _.get(payload, 'job_id');

	if (!_.isString(job_id)) {
		return deferred.reject(new Error('Expected "payload" to include property "job_id" as type String. Instead received ' + typeof job_id));
	}

	this
		.child(job_id)
		.update(payload, onPayloadUpdate);

	/**
	 * [onPayloadUpdate description]
	 * @param  {Error} err [Firebase update error]
	 * @return {undefined}
	 */
	function onPayloadUpdate(err) {
		err ? deferred.reject(err) : deferred.resolve(payload);
	}

	return deferred.promise;
};