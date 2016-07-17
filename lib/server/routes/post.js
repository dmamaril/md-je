module.exports = function postRoutes(app, JobService) {

    var url         = require('url');
    var _           = require('lodash');
    var errHandler  = require('../middlewares/errHandler.js');

    var setJob      = JobService.setJob;
    var addToQueue  = JobService.addToQueue;

    app.post('/jobs', startJob);

    /**
     * [startJob description]
     *
     *  >> Expect JSON payload with field "uri"
     *  >> initially set job status to "PENDING"
     *  >> get resource after job insert
     *  >> update job data with resource
     * 
     * @param  {Object} req [Express HTTP Object]
     * @param  {Object} res [Express HTTP Object]
     * @return {undefined}
     */
    function startJob(req, res) {

        var uri = _.get(req, 'body.uri', null);

        if (!_.isString(uri)) {

            res.status(422)
                .send('Expected "uri" to be type String. Instead received ' + typeof uri);

            return;
        }

        var payload = {
            uri     : uri,
            status  : 'PENDING',
        };

        setJob(payload)
            .then(sendJobID)
            .then(addToQueue)
            .catch(errHandler);

        /**
         * [sendJobID description]
         *
         * End response early for users to get expected job_id;
         * pass original payload forward to getResource to start job;
         * 
         * @param  {Object} payload [same as above + job_id from firebase entry]
         * @return {Object} payload [^]
         */
        function sendJobID(payload) {
            res.status(201).send(payload);
            return payload;
        }
    }
};