# Getting Started
```
npm install
node index.js
```

# Sending Jobs

Takes a JSON payload with property `uri`. All other formats are rejected with a status code of 422.

```
curl -iv -X POST -H 'Content-type:application/json' 0.0.0.0:8080/jobs -d @path/to/file.json
```

Expect response status code 201 along with a job_id in the response body

```
{
	"status"	:"PENDING",
	"uri"		:"www.google.com",
	"job_id"	:"-KMpvcCbaAOq8QdxDYPg"
}
```

# Retrieving Jobs

Attach `job_id` as path to the `/jobs` end point.

```
curl -iv -X GET 0.0.0.:8080/jobs/-KMpvcCbaAOq8QdxDYPg
```

Expect response status code 200. If the job was successfully completed, expect the HTML string body of the resource requested. Otherwise, response user will be provided with the whole record.

There are three status' in which a job will be in. `["PENDING", "FAILED", "COMPLETED"]`.

# Tests

```
npm test
```
