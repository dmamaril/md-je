var package = require('./package.json');
var PORT 	= process.env.PORT || 8080;

require('./lib/server').listen(PORT);

console.log('***********************************');
console.log('*');
console.log('*', package.name);
console.log('*', 'v' + package.version)
console.log('*');
console.log('* listening at port', PORT);
console.log('***********************************');