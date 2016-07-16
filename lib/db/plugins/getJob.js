var q = require('q');
var _ = require('lodash');

/**
 * [getJob description]
 * 
 * @param  {String} key [Firebase child ref key]
 * @return {Promise}    [q.promise;]
 */
module.exports = function getJob(key) {

	var deferred = q.defer();

	if (!_.isString(key)) {
		return deferred.reject('Expected "key" to be type String. Instead received ' + typeof key);
	}

	this.child(key).on('value', retrieveVal);

	/**
	 * [retrieveVal description]
	 * 
	 * @param  {Object} snapshot [Firebase Snapshot Object]
	 * @return {undefined}
	 */
	function retrieveVal(snapshot) {

		var data = snapshot.val();

		if (data) {
			return deferred.resolve(data);
		}

		var err = new Error('Failed to retrieve job ID:' + key);
		deferred.reject(err);
	}

	return deferred.promise;
};