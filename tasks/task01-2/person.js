module.exports = (name) => ({
    name,
    greeting() {
        return `Hello, ${this.name}!`;
    }
});