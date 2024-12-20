const validUserIDs = ["USER123", "TEST456"]; // Valid user IDs

let currentQuestionIndex = 0;

let userAnswers = [];

let timerInterval;

let remainingTime = 10 * 60; // 10 minutes

let fullName = "";

let userID = "";

const questions = [

    
    {
        question: "Four grams (4 g) of a mixture of CaCO₃ and sand is treated with an excess of hydrochloric acid, and 0.880 g of CO₂ is produced. What is the percent of CaCO₃ in the original mixture?",
        answers: ["10.0%", "50.0%", "30.0%", "70.0%"],
        correct: "50.0%"
    },
    {
        question: "What is the molar concentration of a solution prepared by adding 750.0 mL of 0.25 M NaOH to 250.0 mL of H₂O? Leave your answer to 2 significant figures.",
        answers: ["0.25 M", "0.20 M", "0.21 M", "0.15 M"],
        correct: "0.20 M"
    },
    {
        question: "Which halogen has the greatest first ionization energy?",
        answers: ["F", "B", "Cl", "I"],
        correct: "F"
    },
    {
        question: "What is the molecular mass of an organic compound having a molar mass of 60.00 amu if it consists of 39.9% C, 6.72% H given that the third element in the acid is oxygen? [H = 1; C = 12; O = 16]",
        answers: ["C₂H₄O₂", "C₂H₂O₂", "C₃H₆O₄", "C₄H₁₀O₄"],
        correct: "C₂H₄O₂"
    }, 
    {
        question: "The idea of a positively charged nucleus in the center of an atom was discovered through:",
        answers: [
            "Cathode ray discharge experiment",
            "Atomic emission lines",
            "Alpha particle scattering experiment",
            "Wave-particle dual properties of electron"
        ],
        correct: "Alpha particle scattering experiment"
    },
    {
        question: "Which of the following statements are correct about determinate errors?",
        answers: [
            "Determinate errors are also known as random errors",
            "Determinate errors are irregular and variable in magnitude and sign",
            "They are due to fluctuation of temperatures",
            "They are known as systematic errors"
        ],
        correct: "They are known as systematic errors"
    },
    {
        question: "List the proper number of significant figures in the following numbers: 0.216, 90.7, 800.0, 0.0670, 0.0060.",
        answers: ["3, 3, 4, 4, 2", "3, 3, 4, 3, 2", "3, 3, 3, 3, 2", "3, 3, 4, 3, 4"],
        correct: "3, 3, 4, 3, 2"
    },
    {
        question: "Which of the following represents the smallest mass?",
        answers: ["23 g", "2.3 x 10³ µg", "0.23 mg", "2.3 x 10² kg"],
        correct: "0.23 mg"
    },
    {
        question: "In a ground-state P atom in the gas phase, how many electrons have quantum numbers n = 3, l = 1, ml = 1? [Atomic number of P = 15]",
        answers: ["0", "1", "2", "3"],
        correct: "1"
    },
    {
        question: "Calculate the actual number of SO₄²⁻ ions in 14.3 g Cr₂(SO₄)₃. [O = 16; S = 32; Cr = 52; Nₐ = 6.02 x 10²³]",
        answers: [
            "6.59 x 10²³ SO₄²⁻ ions",
            "4.39 x 10²³ SO₄²⁻ ions",
            "6.59 x 10²² SO₄²⁻ ions",
            "4.39 x 10²² SO₄²⁻ ions"
        ],
        correct: "4.39 x 10²³ SO₄²⁻ ions"
    },
    {
        question: "Mercury has a density of 13.6 g/mL. What volume of mercury must be taken to obtain 225 g of the metal?",
        answers: ["16.5 mL", "165 mL", "1.65 mL", "0.060 mL"],
        correct: "16.5 mL"
    },
    {
        question: "How many grams of zinc iodide is 0.654 mol zinc iodide? [Zn = 65.41; I = 126.90]",
        answers: ["208.8 g", "22.98 g", "208.67 g", "208.76 g"],
        correct: "208.76 g"
    },
    {
        question: "Which of the following is/are true about homogeneous mixtures?",
        answers: [
            "They are also known as solutions",
            "They have uniform properties throughout a given sample",
            "They contain physically distinct parts with different properties",
            "I and II only"
        ],
        correct: "I and II only"
    },
    {
        question: "To a 0.254-g sample of pure lead(II) ethanoate was added excess K₂Cr₂O₇ in which case 0.130 g of lead(II) chromate was precipitated. What is the percentage composition of lead in the organic salt? [O = 16; Cr = 52; Pb = 207]",
        answers: ["28.80%", "38.80%", "63.69%", "42.80%"],
        correct: "63.69%"
    },
    {
        question: "The idea of a positively charged nucleus in the center of an atom was discovered through:",
        answers: [
            "Cathode ray discharge experiment",
            "Atomic emission lines",
            "Alpha particle scattering experiment",
            "Wave-particle dual properties of electron"
        ],
        correct: "Alpha particle scattering experiment"
    },
    {
        question: "How many unpaired electrons does a ground-state gas phase Cr²⁺ ion have? [Atomic number Cr = 24]",
        answers: ["0", "2", "4", "6"],
        correct: "4"
    },
    {
        question: "Quicklime (CaO) is produced by thermal decomposition of calcium carbonate (CaCO₃). Calculate the volume of CO₂ produced at STP from the decomposition of 60.8 g CaCO₃. [C = 12; O = 16; Ca = 40; Molar volume = 22.4 L]",
        answers: ["13.6 L", "31.4 L", "26.3 L", "34.1 L"],
        correct: "13.6 L"
    },
    {
        question: "The only product when CuSO₄ reacts completely with NH₃ is Cu(NH₃)₄SO₄. What mole of NH₃ is required to produce 568.8 g of Cu(NH₃)₄SO₄? [H = 1; N = 14; O = 16; S = 32; Cu = 63.5]",
        answers: ["4 mol NH₃", "8 mol NH₃", "6 mol NH₃", "10 mol NH₃"],
        correct: "6 mol NH₃"
    },
    {
        question: "An organic acid contains C, H, and O only in one molecule of it. When subjected to combustion analysis, one mole of it was discovered to contain 68.8% C and 5.0% H. What is its empirical formula? [H = 1; C = 12; O = 16]",
        answers: ["C₇H₆O₂", "C₅H₆O₂", "C₆H₆O₂", "CH₂O"],
        correct: "C₇H₆O₂"
    },
    {
        question: "When 20 g of Li reacts with 30 g of oxygen to form Li₂O, which of the reagents is in excess and by how much? [Li = 6.94; O = 16.0]",
        answers: [
            "Oxygen, by 13.00 g",
            "Oxygen, by 7.00 g",
            "Lithium, by 13.00 g",
            "Lithium, by 7.00 g"
        ],
        correct: "Oxygen, by 7.00 g"
    },
    {
        question: "A 25.0-cm³ portion of 3.00 M sodium oxalate, Na₂C₂O₄, solution is warmed and titrated against an acidified solution of KMnO₄. If 45.0 cm³ of KMnO₄ solution is required for the titration, determine the concentration of the KMnO₄ in g/dm³. [O = 16, K = 39; Mn = 54.9]",
        answers: ["15.79", "12.58", "13.59", "10.53"],
        correct: "15.79"
    },
    {
        question: "In an experiment, 20.0 g of methanol and 15.0 g of carbon monoxide were placed in a reaction chamber, and methanol was formed according to CH₃OH + CO → CH₃COOH. The actual yield of the ethanoic acid is 30.1 g. Calculate the percentage yield.",
        answers: ["96.4%", "89.1%", "93.6%", "81.9%"],
        correct: "93.6%"
    },
    {
        question: "When balanced in a basic medium, the ionic equation CN⁻ + MnO₄⁻ → CNO⁻ + MnO₂ exactly becomes:",
        answers: [
            "3CN⁻ + 2MnO₄⁻ + H₂O → 3CNO⁻ + 2MnO₂ + 2OH⁻",
            "3CN⁻ + 6OH⁻ → 3CNO⁻ + 3H₂O + 6e⁻",
            "MnO₄⁻ + 4H₂O + 6e⁻ → 2MnO₂ + 8OH⁻",
            "3CN⁻ + 2MnO₄⁻ + 4H₂O + 6OH⁻ → 3CNO⁻ + 2MnO₂ + 8OH⁻ + 3H₂O"
        ],
        correct: "3CN⁻ + 2MnO₄⁻ + H₂O → 3CNO⁻ + 2MnO₂ + 2OH⁻"
    },
    {
        question: "Fifteen grams (15.00 g) of hydrated calcium sulphate, CaSO₄.nH₂O, weighs 11.85 g after being heated to a constant mass. What value of n in CaSO₄.nH₂O? [H = 1; O = 16; S = 32; Ca = 40]",
        answers: ["1", "2", "5", "7"],
        correct: "2"
    }, 
    {
        question: "Which of the following statements gives the correct molecular interpretation of the reaction: Fe₂(SO₄)₃(aq) + BaCl₂(aq) → FeCl₃(aq) + BaSO₄(s) after it has been balanced?",
        answers: [
            "1 mole of Fe₂(SO₄)₃ reacts with 3 molecules of BaCl₂ to produce 2 moles of FeCl₃ and 3 molecules of BaSO₄.",
            "2 moles of Fe₂(SO₄)₃ reacts with 3 moles of BaCl₂ to produce 2 moles of FeCl₃ and 3 moles of BaSO₄.",
            "1 molecule of Fe₂(SO₄)₃ reacts with 3 molecules of BaCl₂ to produce 2 molecules of FeCl₃ and 3 molecules of BaSO₄.",
            "2 molecules of Fe₂(SO₄)₃ reacts with 3 molecules of BaCl₂ to produce 3 molecules of FeCl₃ and 2 molecules of BaSO₄."
        ],
        correct: "1 mole of Fe₂(SO₄)₃ reacts with 3 molecules of BaCl₂ to produce 2 moles of FeCl₃ and 3 molecules of BaSO₄."
    },
    {
        question: "You performed an experiment in the lab and found out that there are 36.3 inches in a meter. Using this experimental value, how many millimeters are there in 1.34 feet?",
        answers: ["4.43 × 10⁵ mm", "8.43 × 10² mm", "44.3 mm", "4.43 × 10² mm"],
        correct: "4.43 × 10² mm"
    },
    {
        question: "When the isoelectronic species K⁺, Ca²⁺, and Cl⁻ are arranged in order of increasing radius, what is the correct order?",
        answers: [
            "K⁺, Ca²⁺, Cl⁻",
            "K⁺, Cl⁻, Ca²⁺",
            "Ca²⁺, K⁺, Cl⁻",
            "Ca²⁺, Cl⁻, K⁺"
        ],
        correct: "Ca²⁺, K⁺, Cl⁻"
    },
    {
        question: "A sample containing 33.42 g of metal pellets is poured into a graduated cylinder initially containing 12.7 ml of water, causing the water level in the cylinder to rise to 21.6 ml. Calculate the density of the metal.",
        answers: ["8.9 g/ml", "3.75 g/ml", "3.76 g/ml", "3.75 g/ml"],
        correct: "3.75 g/ml"
    },
    {
        question: "A carbonyl oxygen double bond in a certain organic molecule absorbs radiation that has a frequency of 6.0 × 10¹³ s⁻¹. What is the energy of this radiation per mole of photons?",
        answers: [
            "2.4 × 10³ J",
            "2.00 × 10⁴ J",
            "3.978 × 10³ J",
            "7.18 × 10¹¹ J"
        ],
        correct: "2.00 × 10⁴ J"
    },
    {
        question: "If the chemical equation aK₄Fe(CN)₆ + bH₂SO₄ + cH₂O → dK₂SO₄ + eFeSO₄ + f(NH₄)₂SO₄ + gCO is balanced, what are the respective values of a, b, c, d, e, f, and g?",
        answers: [
            "1, 6, 6, 2, 1, 6, 6",
            "6, 2, 1, 6, 6, 3, 2",
            "1, 6, 1, 6, 6, 6, 3",
            "2, 3, 4, 8, 1, 6, 6"
        ],
        correct: "1, 6, 6, 2, 1, 6, 6"
    },
    {
        question: "Determination of the charge as well as the mass of the electron was first made by which of the following scientists?",
        answers: [
            "Thomson",
            "Ernest Rutherford",
            "Louis de Broglie",
            "Robert Millikan"
        ],
        correct: "Robert Millikan"
    },
    {
        question: "An experiment requires 43.7 g of propan-2-ol. Instead of using a balance, a student dispensed the liquid into a measuring cylinder. If the density of propan-2-ol is 0.785 g/cm³, what volume of propan-2-ol should be used?",
        answers: ["34.3 cm³", "55.7 cm³", "1.80² cm³", "5.567 cm³"],
        correct: "55.7 cm³"
    },
    {
        question: "An excited hydrogen atom emits light with a wavelength of 397.2 nm to reach the energy level for which n = 2. In which principal quantum number did the electron begin? [R_H = 1.097 × 10⁷ m⁻¹]",
        answers: ["3", "5", "7", "9"],
        correct: "7"
    },
    {
        question: "An atom of a particular element is traveling at 1% of the speed of light. The de Broglie wavelength is found to be 5.784 × 10⁻⁶ nm. The element is likely to be which of the following?",
        answers: ["Ca", "K", "Be", "Na"],
        correct: "Na"
    }, 
    {
        question: "When 20 g of Li reacts with 30 g of oxygen to form Li₂O, which of the reagents is in excess and by how much?",
        answers: ["Oxygen, by 13.00 g", "Oxygen, by 7.00 g", "Lithium, by 13.00 g", "Lithium, by 7.00 g"],
        correct: "Lithium, by 7.00 g"
    },
    {
        question: "A 25.0-cm³ portion of 0.30 M sodium oxalate, Na₂C₂O₄, solution is warmed and titrated against an acidified solution of KMnO₄. If 45.0 cm³ of KMnO₄ solution is required for the titration, determine the concentration of the KMnO₄ in g/dm³.",
        answers: ["15.79", "12.58", "13.59", "10.53"],
        correct: "13.59"
    },
    {
        question: "In an experiment, 200 g of methanol and 15.0 g of carbon monoxide were placed in a reaction flask to produce ethanoic acid. After the reaction, the total mass of the flask was 30.1 g. Calculate the percentage yield of the ethanoic acid.",
        answers: ["96.4%", "89.1%", "93.6%", "81.9%"],
        correct: "89.1%"
    },
    {
        question: "When balanced in a basic medium, the ionic equation: CN⁻ + MnO₄⁻ → CNO⁻ + MnO₂ exactly becomes",
        answers: [
            "3CN⁻ + 2MnO₄⁻ + H₂O → 3CNO⁻ + 2MnO₂ + 2OH⁻",
            "3CN⁻ + 6OH⁻ → 3CNO⁻ + 3H₂O + 6e⁻",
            "MnO₄⁻ + 4H₂O + 6e⁻ → 2MnO₂ + 8OH⁻",
            "3CN⁻ + 2MnO₄⁻ + 4H₂O + 6OH⁻ → 3CNO⁻ + 2MnO₂ + 8OH⁻ + 3H₂O"
        ],
        correct: "3CN⁻ + 2MnO₄⁻ + H₂O → 3CNO⁻ + 2MnO₂ + 2OH⁻"
    },
    {
        question: "Fifteen grams (15.00 g) of hydrated calcium sulphate, CaSO₄·nH₂O, weighs 11.85 g after being heated to a constant mass. What value of n in CaSO₄·nH₂O?",
        answers: ["1", "2", "5", "7"],
        correct: "2"
    },
    {
        question: "The maximum energy of electromagnetic radiation that can completely remove (ionize) an electron from the hydrogen atom is 1.36 × 10⁻¹⁹ J. Determine the initial excited state for the electron (n = ?).",
        answers: ["2", "4", "6", "7"],
        correct: "4"
    },
    {
        question: "When 2.86 g of a mixture of 1-butene (C₄H₈) and butane (C₄H₁₀) was burned in excess oxygen, 8.80 g of CO₂ and 4.14 g of H₂O were obtained. Calculate the percentage by mass of C₄H₈ and C₄H₁₀ respectively in the original mixture.",
        answers: ["39.2 and 60.8%", "50.0 and 50.0%", "37.2 and 62.8%", "60.8 and 39.2%"],
        correct: "39.2 and 60.8%"
    },
    {
        question: "What is the net ionic equation for the balanced equation: 16HCl + 2KMnO₄ → 2MnCl₂ + 5Cl₂ + 8H₂O + 2KCl?",
        answers: [
            "16H⁺ + 2MnO₄⁻ → 2Mn²⁺ + 5Cl₂ + 8H₂O",
            "2MnO₄⁻ → 2Mn²⁺ + 5Cl₂",
            "2MnO₄⁻ + 5Cl⁻ + 8H⁺ → 2Mn²⁺ + 5Cl₂ + 4H₂O",
            "MnO₄⁻ + Cl⁻ + H⁺ → Mn²⁺ + Cl₂"
        ],
        correct: "2MnO₄⁻ + 5Cl⁻ + 8H⁺ → 2Mn²⁺ + 5Cl₂ + 4H₂O"
    }, 

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
    doc.text("OAU STUDENTS SUPPORT SYSTEM", pageWidth / 2, 40, { align: "center" });

    doc.setFontSize(18);
    doc.text("CHM101 MOCK EXAMINATION", pageWidth / 2, 70, { align: "center" });

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
