const [, , ...nums] = process.argv;
const result = (nums || []).reduce((sum, curr) => sum + 1 * curr, 0);
console.log(`Sum is ${result}`);