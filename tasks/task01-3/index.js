const [, , type] = process.argv;
const animal = require('./animal')(type);

console.log(animal ? animal.sayHello() : 'Silence...');