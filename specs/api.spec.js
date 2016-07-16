var _       = require('lodash');
var request = require('supertest');
var expect  = require('chai').expect;

describe('App Routes', function () {

    var server = require('../lib/server');
    var job_id;

    describe('POST /jobs', function () {

        it('should respond with a 422 with invalid payloads', function (done) {

            var invalid_payload = { "BAD": "NO!" };

            request(server)
                .post('/jobs')
                .send(invalid_payload)
                .expect(422, done);
        });

        it('should respond with a 201 on create', function (done) {

            var valid_payload = { "uri": "https://google.com" };

            request(server)
                .post('/jobs')
                .send(valid_payload)
                .expect(201)
                .end(saveJobKey);

            function saveJobKey(err, response) {

                if (err) {
                    throw err;
                }

                var key             = _.get(response, 'body.job_id');
                var status_code     = response.statusCode;
                var key_is_string   = _.isString(key);

                expect(status_code).to.equal(201);
                expect(key_is_string).to.equal(true);

                if (key_is_string) {
                    job_id = key;
                }

                done();
            }
        });
    });

    describe('GET /jobs/:job_id', function () {

        it('should respond with a 404 with nonexistant ids', function (done) {

            request(server)
                .get('/jobs/IM_A_BAD_ID')
                .expect(404, done);
        });


        // will not find ID if POST specs fail;
        it('should respond 200 when provided with proper id', function (done) {

            request(server)
                .get('/jobs/' + job_id)
                .expect(200)
                .end(validateResponse);

            function validateResponse(err, response) {

                if (err) {
                    throw err;
                }

                response            = response.body;
                var status          = response.status;
                var is_valid_enum   = (status === 'PENDING' || status === 'FAILED');

                status !== 'COMPLETED' ?
                    expect(is_valid_enum).to.equal(true) :
                    expect(_.isString(response)).to.equal(true);
            }
        });
    });
});