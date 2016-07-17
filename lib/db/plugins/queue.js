var q           = require('q');
var async       = require('async');
var _           = require('lodash');

var CONCURRENCY = process.env.QUEUE_CONCURRENCY || 2;
var job_queue   = async.queue(processQueue, CONCURRENCY);

/**
 * [processQueue description]
 *
 * Invoke jobTask passing in cb for task to call when completed and open up queue;
 * 
 * @param  {[type]}   task [description]
 * @param  {Function} cb   [description]
 * @return {[type]}        [description]
 */
function processQueue(task, cb) {
    task(cb);
}

/**
 * [addToQueue description]
 *
 * >> pull updateJob & getResource from utils;
 * >> bind both to rootRef to have access to firebase DB methods
 * 
 * @param  {Object} payload [Job Object]
 * @return {undefined}
 */
module.exports = function addToQueue(payload) {

    var updateJob   = require('./utils/updateJob.js');
    var getResource = require('./utils/getResource.js');

    var rootRef     = this;
    updateJob       = updateJob.bind(rootRef);
    getResource     = getResource.bind(rootRef);

    /**
     * [jobTask description]
     *
     * getResource with payload.uri & updateJob accordingly;
     * 
     * @param  {Function} next [Async.queue callback]
     * @return {undefined}
     */
    function jobTask(next) {
        getResource(payload)
            .then(updateJob , next)
            .then(next      , next);
    }

    job_queue.push(jobTask);
};