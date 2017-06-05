const readline = require('readline');

module.exports = class {

    constructor(questions, timeout = 30000) {
        this.questions = questions;
        this.timeout = timeout;
        this.startTime = 0;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    run() {
        this.startTime = Date.now();
        return this.questions.reduce((p, q, i) => p.then(() => this.processQuestion(q, i)), Promise.resolve())
            .catch(() => {
                console.log('Time is up!\r\n');
            })
            .then(() => {
                this.rl.close();
                return this.getResult();
            });
    }

    processQuestion(q, i) {
        return new Promise((resolve, reject) => {
            if (this.checkTimeout()) {
                reject();
                return;
            }

            this.rl.question(this.formatQuestion(q, i), answer => {
                q.answer = 1 * answer - 1;
                if (this.checkQuestion(q)) {
                    console.log('\r\nCorrect\r\n');
                } else {
                    console.log('\r\nIncorrect\r\n');
                }
                console.log('\r\n---------------------------------');
                resolve();
            });
        });
    }

    formatQuestion(q, i) {
        return `Question ${i + 1}/${this.questions.length}: ${q.title}` + '\r\n' + q.questions.map((t, i) => `${i + 1} ${t}`).join('\r\n') + '\r\n\r\nAnswer: ';
    }

    checkQuestion(q) {
        return q.answer === q.check;
    }

    checkTimeout() {
        return Date.now() - this.startTime > this.timeout;
    }

    getResult() {
        return this.questions.reduce((score, q) => score + (this.checkQuestion(q) && 1), 0);
    }
}