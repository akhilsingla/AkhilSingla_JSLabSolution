function question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
};

question.prototype.isCorrectAnswer = function (answer) {
    return this.answer === answer
};

var quizQuestions = [
    new question("Capital of India ?", ["New Delhi", "London", "Washington DC", "Paris"], "New Delhi"),
    new question("Capital of UK ?", ["New Delhi", "London", "New York", "Paris"], "London"),
    new question("Capital of USA ?", ["New Delhi", "London", "Washington DC", "Paris"], "Washington DC"),
    new question("Capital of France ?", ["New Delhi", "London", "Washington DC", "Paris"], "Paris"),
    new question("Capital of Bhutan ?", ["New Delhi", "London", "New York", "Thimphu"], "Thimphu"),
];

function quizDetail(quizQuestions) {
    this.quizQuestions = quizQuestions;
    this.score = 0;
    this.questionIndex = 0;
};

quizDetail.prototype.isEnded = function () {
    return this.questionIndex === this.quizQuestions.length;
};

quizDetail.prototype.getQuestionByIndex = function () {
    return this.quizQuestions[this.questionIndex]
};

quizDetail.prototype.checkOptionWithAnswer = function (answer) {
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
};

var quiz = new quizDetail(quizQuestions);

function quizChoiceButtonOnClickAction(buttonId, choice) {
    var button = document.getElementById(buttonId);
    button.onclick = function () {
        quiz.checkOptionWithAnswer(choice);

        loadQuestions();
    }
};

function showProgress() {
    var currentQuestion = quiz.questionIndex + 1;
    var progress = document.getElementById("progress");
    progress.innerHTML = "Question " + currentQuestion + " of " + quiz.quizQuestions.length;
};

function showScores() {
    var quizOverHtml = `
    <h1> Result </h1>
    <h2 id="score">Your Score is
    ` + quiz.score + " and your % is " + (quiz.score / quiz.quizQuestions.length) * 100 + "%</h2>";

    var content = document.getElementById("quiz");
    content.innerHTML = quizOverHtml;
}

function loadQuestions() {
    if (quiz.isEnded()) {
        showScores();
    } else {

        var question = document.getElementById("question")
        question.innerHTML = quiz.getQuestionByIndex().text;

        var choices = quiz.getQuestionByIndex().choices;

        for (var i = 0; i < choices.length; i++) {
            var choice = document.getElementById("choice" + i);
            choice.innerHTML = choices[i];

            quizChoiceButtonOnClickAction("btn" + i, choices[i])
        }

        showProgress();
    }
};


loadQuestions();