function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
}

Quiz.prototype.guess = function (answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.currentQuestionIndex++;
};

Quiz.prototype.getCurrentQuestion = function () {
    return this.questions[this.currentQuestionIndex];
};

Quiz.prototype.hasEnded = function () {
    return this.currentQuestionIndex >= this.questions.length;
};

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
};

let QuizUI = {
    displayNext: function () {
        if (quiz.hasEnded()) {
            this.displayScore();
        } else {
            this.displayQuestion();
            this.displayChoices();
            this.displayProgress();
        }
    },
    displayQuestion: function () {
        this.populateWithHTML("question", quiz.getCurrentQuestion().text);
    },
    displayChoices: function () {
        let choices = quiz.getCurrentQuestion().choices;
        for (let i = 0; i < choices.length; i++) {
            this.populateWithHTML("choice" + i, choices[i]);
            this.guessHandler("guess" + i, choices[i]);
        }
    },
    displayScore: function () {
        let gameOverHTML = "<h1>Game Over</h1>";
        gameOverHTML += "<h2>Your score is: " + quiz.score + " / " + quiz.questions.length + "</h2>";
        gameOverHTML += "<button id='play-again' class='btn-default'>Play Again</button>";
        this.populateWithHTML("quiz", gameOverHTML);
        this.setupPlayAgainButton();
    },
    setupPlayAgainButton: function () {
        let playAgainButton = document.getElementById('play-again');
        playAgainButton.onclick = function () {
            quiz = new Quiz(questions);
            QuizUI.resetQuizUI();
            QuizUI.displayNext();
        };
    },
    resetQuizUI: function () {
        this.populateWithHTML("quiz", `
        <h1>Quiz App</h1>
        <h2 id="question" class="headline-secondary-grouped"></h2>
        <div id="score"></div>

        <p id="choice0"></p>
        <button id="guess0" class="btn-default">Choose Currect Answer</button>

        <p id="choice1"></p>
        <button id="guess1" class="btn-default">Choose Currect Answer</button>

        <p id="choice2"></p>
        <button id="guess2" class="btn-default">Choose Currect Answer</button>

        <p id="choice3"></p>
        <button id="guess3" class="btn-default">Choose Currect Answer</button>

        <footer>
          <p id="progress">
            Question X of Y
          </p>
        </footer>
        `);
    },
    populateWithHTML: function (id, text) {
        let element = document.getElementById(id);
        if (element) {
            element.innerHTML = text;
        }
    },
    guessHandler: function (id, guess) {
        let button = document.getElementById(id);
        button.onclick = function () {
            quiz.guess(guess);
            QuizUI.displayNext();
        };
    },
    displayProgress: function () {
        let currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.populateWithHTML("progress", "Question " + currentQuestionNumber + " of " + quiz.questions.length);
    },
};

// Create Questions
let questions = [
    new Question("Which planet has the most moons?", ["Jupiter", "Uranus", "Saturn", "Mars"], "Saturn"),
    new Question("What country has won the most world cups?", ["Brazil", "Argentina", "England", "France"], "Brazil"),
    new Question("How many bones are in the human ear?", ["8", "14", "5", "3"], "3"),
    new Question("Which Netflix Show had the most streaming views in 2021?", ["The Witcher", "Arcane League of Legends", "Squid Game", "Midnight Mass"], "Squid Game"),
    new Question("What is the Fourth letter in the Greek Alphabet?", ["Zeta", "Alpha", "Delta", "Epsilon"], "Delta")
];

// Create Quiz
let quiz = new Quiz(questions);

// Display Quiz
QuizUI.displayNext();
