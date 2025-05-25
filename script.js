const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Blue whale", correct: true },
            { text: "Shark", correct: false },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "What was the main cause of World War I?",
        answers: [
            { text: "The rise of fascism in Europe", correct: false },
            { text: "The assassination of Archduke Franz Ferdinand", correct: true },
            { text: "The invasion of Poland", correct: false },
            { text: "The bombing of Pearl Harbor", correct: false },
        ]
    },
    {
        question: "Which empire was ruled by Genghis Khan?",
        answers: [
            { text: "Mongol Empire", correct: true },
            { text: "Roman Empire", correct: false },
            { text: "Ottoman Empire", correct: false },
            { text: "Persian Empire", correct: false },
        ]
    },
    {
        question: "The fall of the Berlin Wall occurred in what year?",
        answers: [
            { text: "1985", correct: false },
            { text: "1987", correct: false },
            { text: "1991", correct: false },
            { text: "1989", correct: true },
        ]
    },
    {
        question: "What was the main purpose of the Marshall Plan after World War II?",
        answers: [
            { text: "To punish Axis powers", correct: false },
            { text: "To rebuild the economies of war-torn European countries", correct: true },
            { text: "To create the United Nations", correct: false },
            { text: "To expand the Soviet influence in Europe", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();