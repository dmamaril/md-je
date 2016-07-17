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

    var methods = [
        require('./getJob.js'),
        require('./setJob.js'),
        require('./queue.js')
    ];

    /**
     * [bindToRootRef description]
     *
     *  Reduce iterator
     *      >> bind all fns in methods array to firebase rootRef
     * 
     * @param  {Function} fn [DB Helper]
     * @return {[type]}      [bound db helper to rootRef]
     */
    function bindToRootRef(service, fn) {
        service[fn.name] = fn.bind(rootRef);
        return service;
    };

    return methods.reduce(bindToRootRef, {});
}