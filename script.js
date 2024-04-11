const startButton = document.getElementById('startButton');
const levelSelect = document.getElementById('levelSelect');
const quizContainer = document.querySelector('.quiz-container');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const scoreElement = document.getElementById('scoreValue');

let currentQuestionIndex = 0;
let currentLevel = '';
let questions = [];
let score = 0;

startButton.addEventListener('click', () => {
    document.getElementById('levels').style.display = 'block';
});

levelSelect.addEventListener('change', () => {
    currentLevel = levelSelect.value;
    startQuiz();
});

function startQuiz() {
    if (currentLevel !== '') {
        document.getElementById('levels').style.display = 'none';
        quizContainer.style.display = 'block';
        currentQuestionIndex = 0;
        score = 0;
        scoreElement.textContent = score;
        fetchQuestions();
    }
}

function fetchQuestions() {
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            questions = data[currentLevel];
            loadNextQuestion();
        });
}

function loadNextQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    optionsContainer.innerHTML = '';
    const options = ['True', 'False'];
    options.forEach((option) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.addEventListener('click', () => selectOption(option === 'True'));
        optionsContainer.appendChild(button);
    });

    // Show or hide next button based on question index
    if (currentQuestionIndex < questions.length - 1) {
        nextBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'none';
    }
}

function selectOption(selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answer) {
        score++;
    }
    scoreElement.textContent = score;

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadNextQuestion();
    } else {
        endQuiz();
    }
}
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadNextQuestion();
    } else {
        endQuiz();
    }
    });
function endQuiz() {
    quizContainer.style.display = 'none';
    alert(`Quiz Ended. Your score is ${score} out of ${questions.length}`);
}