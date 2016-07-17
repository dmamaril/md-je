/**
 * [jobService description]
 *
 *  Firebase helpers to read, create and update /jobs in db;
 *  All plugins return a q.promise;
 * 
 * @param  {Object} rootRef [Firebase db reference to '/jobs']
 * @return {Object}         [DB helpers bound to rootRef]
 */
module.exports = function jobService(rootRef) {
    return {
        getJob      : require('./getJob.js' ).bind(rootRef),
        setJob      : require('./setJob.js' ).bind(rootRef),
        addToQueue  : require('./queue.js'  ).bind(rootRef)
    };
};