// ================================
// VARIABLES
// ================================
let index = 0;
let score = 0;
let selectedOption = null;
let timerInterval;
let quizData = questions;  // Use the questions from questions.js
let totalQuestions = quizData.length;
let totalTime = totalQuestions * 30;   // 30 seconds per question
let timeLeft = totalTime;

// ================================
// START QUIZ
// ================================
window.onload = () => {
    loadQuestion();
    startTimer();
};

// ================================
// TIMER FUNCTION
// ================================
function startTimer() {
    timerInterval = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        document.getElementById("timer").innerHTML =
            `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitQuiz();
        }

        timeLeft--;
    }, 1000);
}

// ================================
// LOAD QUESTION
// ================================
function loadQuestion() {
    selectedOption = null;

    if(index >= quizData.length) {
        submitQuiz();
        return;
    }

    // Remove previous selection highlight
    document.querySelectorAll("#options li").forEach(li => li.classList.remove("selected"));

    document.getElementById("progress").innerHTML = `Q ${index + 1} / ${totalQuestions}`;
    document.getElementById("question").innerHTML = quizData[index].question;

    let optionsHTML = "";
    quizData[index].options.forEach(option => {
        optionsHTML += `<li onclick="selectOption(this)">${option}</li>`;
    });

    document.getElementById("options").innerHTML = optionsHTML;
}

// ================================
// SELECT OPTION
// ================================
function selectOption(element) {
    document.querySelectorAll("#options li").forEach(li => li.classList.remove("selected"));

    element.classList.add("selected");
    selectedOption = element.innerText.trim();
}

// ================================
// NEXT QUESTION
// ================================
function nextQuestion() {
    if (!selectedOption) {
        alert("Please select an answer first!");
        return;
    }

    // Correct answer check
    if (selectedOption === quizData[index].options[quizData[index].answer]) {
        score++;
    }

    index++;
    loadQuestion(); // automatically loads next question
}

// ================================
// SUBMIT QUIZ
// ================================
function submitQuiz() {
    clearInterval(timerInterval);

    // Store score in localStorage for result page
    localStorage.setItem("score", score);

    // Redirect to result page
    window.location.href = "result.html";
}
