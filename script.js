const validUserIDs = ["USER123", "TEST456"]; // Valid user IDs

let currentQuestionIndex = 0;

let userAnswers = [];

let timerInterval;

let remainingTime = 10 * 60; // 10 minutes

let fullName = "";

let userID = "";

const questions = [

    { question: "What is 2 + 2?", answers: ["3", "4", "5"], correct: "4" },

    { question: "What is the capital of France?", answers: ["Rome", "Paris", "Berlin"], correct: "Paris" },

    { question: "What is the largest planet?", answers: ["Earth", "Mars", "Jupiter"], correct: "Jupiter" }

];

// DOM Elements

const authSection = document.getElementById("auth-section");

const examSection = document.getElementById("exam-section");

const resultsSection = document.getElementById("results-section");

const loginBtn = document.getElementById("loginBtn");

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");

const submitBtn = document.getElementById("submitBtn");

const questionTitle = document.getElementById("question-title");

const answerOptions = document.getElementById("answer-options");

const progressBar = document.querySelector(".progress-bar");

const timerElement = document.getElementById("timer");

const userDetails = document.getElementById("user-details");

const resultsContent = document.getElementById("results-content");

const downloadPDF = document.getElementById("downloadPDF");

// Authentication

loginBtn.addEventListener("click", () => {

    const fullNameInput = document.getElementById("fullName").value.trim();

    const userIDInput = document.getElementById("userID").value.trim();

    if (!fullNameInput || !userIDInput) {

        alert("Please enter both Full Name and User ID.");

        return;

    }

    if (!validUserIDs.includes(userIDInput)) {

        alert("Invalid User ID. Please try again.");

        return;

    }

    fullName = fullNameInput;

    userID = userIDInput;

    authSection.classList.add("hidden");

    initializeExam();

});

// Initialize Exam

function initializeExam() {

    userDetails.textContent = `Candidate: ${fullName}`;

    loadQuestion();

    startTimer();

    examSection.classList.remove("hidden");

}

// Load Current Question

function loadQuestion() {

    const question = questions[currentQuestionIndex];

    questionTitle.textContent = question.question;

    // Populate Answer Options

    answerOptions.innerHTML = question.answers

        .map((answer, idx) => `

            <button class="answer-btn" onclick="selectAnswer('${answer}', this)">

                ${idx + 1}. ${answer}

            </button>

        `)

        .join("");

    highlightSelectedAnswer();

    updateButtons();

    updateProgressBar();

}

// Highlight Previously Selected Answer

function highlightSelectedAnswer() {

    const selectedAnswer = userAnswers[currentQuestionIndex];

    if (selectedAnswer) {

        const buttons = document.querySelectorAll(".answer-btn");

        buttons.forEach(button => {

            if (button.textContent.includes(selectedAnswer)) {

                button.classList.add("selected");

            }

        });

    }

}

// Select Answer

function selectAnswer(answer, button) {

    userAnswers[currentQuestionIndex] = answer;

    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach(btn => btn.classList.remove("selected"));

    button.classList.add("selected");

}

// Update Navigation Buttons

function updateButtons() {

    prevBtn.classList.toggle("hidden", currentQuestionIndex === 0);

    nextBtn.classList.toggle("hidden", currentQuestionIndex === questions.length - 1);

    submitBtn.classList.toggle("hidden", currentQuestionIndex !== questions.length - 1);

}

// Update Progress Bar

function updateProgressBar() {

    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    progressBar.style.width = `${progress}%`;

}

// Timer

function startTimer() {

    timerInterval = setInterval(() => {

        const minutes = Math.floor(remainingTime / 60);

        const seconds = remainingTime % 60;

        timerElement.textContent = `Time Remaining: ${minutes}:${seconds.toString().padStart(2, "0")}`;

        if (remainingTime <= 0) {

            clearInterval(timerInterval);

            alert("Time's up! Your exam will now be submitted.");

            submitExam();

        }

        remainingTime--;

    }, 1000);

}

// Navigate to Previous Question

prevBtn.addEventListener("click", () => {

    currentQuestionIndex--;

    loadQuestion();

});

// Navigate to Next Question

nextBtn.addEventListener("click", () => {

    currentQuestionIndex++;

    loadQuestion();

});

// Submit Exam

submitBtn.addEventListener("click", submitExam);

function submitExam() {

    clearInterval(timerInterval); // Stop the timer

    examSection.classList.add("hidden");

    resultsSection.classList.remove("hidden");

    // Display Results

    resultsContent.innerHTML = questions.map((q, i) => {

        const userAnswer = userAnswers[i] || "Not Answered";

        const result = userAnswer === q.correct ? "✅ Correct" : "❌ Wrong";

        return `<p>${i + 1}. ${q.question}<br>Your Answer: <b>${userAnswer}</b> - ${result}</p>`;

    }).join("");

    downloadPDF.addEventListener("click", generatePDF);

}

// Generate PDF

async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4"
    });

    // Page dimensions
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Colors
    const headerBackground = "#4A90E2";
    const bodyBackground = "#ffffff";
    const questionBackground = "#f4f4f9";
    const correctAnswerColor = "#28a745";
    const userAnswerColor = "#6c757d";
    const incorrectAnswerColor = "#dc3545";
    const textColor = "#333";
    const headingTextColor = "#ffffff";

    // Header Section
    doc.setFillColor(headerBackground);
    doc.rect(0, 0, pageWidth, 100, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(headingTextColor);
    doc.text("Modern Exam Academy", pageWidth / 2, 40, { align: "center" });

    doc.setFontSize(18);
    doc.text("Mathematics Final Exam", pageWidth / 2, 70, { align: "center" });

    // Candidate Details Section
    doc.setFontSize(16);
    doc.setTextColor(textColor);
    doc.text(`Candidate: ${fullName}`, 20, 120);
    doc.text(`Exam Date: ${new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    })}`, 20, 140);

    // Body Background
    doc.setFillColor(bodyBackground);
    doc.rect(0, 150, pageWidth, pageHeight - 200, "F");

    // Questions and Answers Section
    let yOffset = 190;
    const questionPadding = 40;
    const leftMargin = 30;
    const questionGap = 40;

    questions.forEach((q, i) => {
        const userAnswer = userAnswers[i] || "Not Answered";
        const isCorrect = userAnswer === q.correct;

        // Question Background
        doc.setFillColor(questionBackground);
        doc.roundedRect(leftMargin - 10, yOffset - 10, pageWidth - leftMargin * 2 + 20, 60, 5, 5, "F");

        // Question
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(textColor);
        doc.text(`${i + 1}. ${q.question}`, leftMargin, yOffset);

        yOffset += 20;

        // User Answer
        doc.setFontSize(14);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(userAnswerColor);
        doc.text(`Your Answer:`, leftMargin, yOffset);
        doc.setTextColor(isCorrect ? correctAnswerColor : incorrectAnswerColor);
        doc.text(userAnswer, leftMargin + 90, yOffset);

        yOffset += 20;

        // Correct Answer
        doc.setTextColor(userAnswerColor);
        doc.text(`Correct Answer:`, leftMargin, yOffset);
        doc.setTextColor(correctAnswerColor);
        doc.text(q.correct, leftMargin + 110, yOffset);

        yOffset += questionGap;

        // Add new page if necessary
        if (yOffset > pageHeight - 100) {
            doc.addPage();
            yOffset = 40;
        }
    });

    // Results Section
    const correctCount = questions.filter((q, i) => q.correct === userAnswers[i]).length;
    const scorePercentage = ((correctCount / questions.length) * 100).toFixed(2);

    if (yOffset > pageHeight - 100) {
        doc.addPage();
        yOffset = 40;
    }

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(textColor);
    doc.text(`Final Results:`, pageWidth / 2, yOffset, { align: "center" });

    yOffset += 30;

    doc.setFontSize(18);
    doc.text(`Total Correct: ${correctCount}`, pageWidth / 2, yOffset, { align: "center" });

    yOffset += 20;

    doc.setFontSize(18);
    doc.text(`Overall Percentage: ${scorePercentage}%`, pageWidth / 2, yOffset, { align: "center" });

    // Footer Section
    const footerY = pageHeight - 30;
    doc.setDrawColor(headerBackground);
    doc.setLineWidth(10);
    doc.line(0, footerY, pageWidth, footerY);

    // Save PDF
    doc.save("Exam_Results.pdf");
}