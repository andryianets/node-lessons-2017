const Quiz = require('./quiz');
const quiz = new Quiz(require('./data.json').questions);

quiz.run()
    .then(result => {
        console.log(`Your score: ${result} from ${quiz.questions.length}`);
    });