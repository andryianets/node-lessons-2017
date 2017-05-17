const [, , name = 'Anonymous'] = process.argv;
const person = require('./person')(name);

console.log(person.greeting());