module.exports = function getRoutes(app, JobService) {

    var _       = require('lodash');
    var getJob  = JobService.getJob;

    app.get('/jobs/:job_key', getJobData);

    /**
     * [getJobData description]
     *
     *  >> safe to expect req.params to exist as route will not be found otherwise
     *  >> retrieve job record based on provided job_key
     *  >> return html_string output if status is "COMPLETED"
     *
     *  Status Enums: ['PENDING', 'FAILED', 'COMPLETED'];
     * 
     * @param  {Object} req [Express HTTP Object]
     * @param  {Object} res [Express HTTP Object]
     * @return {undefined}
     */
    function getJobData(req, res) {

        var job_key = req.params.job_key;

        getJob(job_key).then(onGetJobSuccess, getJobFail);

        /**
         * [onGetJobSuccess description]
         *
         * >> send HTML_STRING if job_status is COMPLETED
         * >> send whole record otherwise
         * 
         * @param  {Object} data [Job Object from firebase db]
         * @return {undefined} 
         */
        function onGetJobSuccess(data) {

            var status      = _.get(data, 'status');
            var html_string = _.get(data, 'body');

            status === 'COMPLETED' ? res.send(html_string) : res.send(data);
        }

        /**
         * [getJobFail description]
         * 
         * >> set status 404 if invalid key is passed in;
         * 
         * @param  {Erorr} err  [Error object from failing to find job by provided job_key]
         * @return {undefined} 
         */
        function getJobFail(err) {
            res.status(404).send(err.message);
        }
    }
};