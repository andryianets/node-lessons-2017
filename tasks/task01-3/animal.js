const animals = {
    dog: require('./dog'),
    cat: require('./cat'),
    bird: require('./bird')
};

module.exports = type => animals[type];