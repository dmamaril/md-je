var q = require('q');

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
	var job_key 	= _.get(payload, 'job_key');

	if (!_.isString(job_key)) {
		return deferred.reject('Expected "payload" to include property "job_key" as type String. Instead received ' + typeof job_key);
	}

	this
		.child(job_key)
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