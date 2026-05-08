// ── Quiz Data ─────────────────────────────────────────────────────────────────
const quizData = [
  {
    question: "What does 'HTTP' stand for?",
    options: [
      "HyperText Transfer Protocol",
      "High-Tech Text Processing",
      "Hyper Transfer Text Program",
      "Hosted Text Transfer Protocol"
    ],
    answer: 0
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Mars", "Saturn"],
    answer: 2
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["O2", "HO", "H2O", "WO"],
    answer: 2
  },
  {
    question: "Who developed the theory of general relativity?",
    options: ["Isaac Newton", "Nikola Tesla", "Galileo Galilei", "Albert Einstein"],
    answer: 3
  },
  {
    question: "What is the primary language used in web page structure?",
    options: ["CSS", "JavaScript", "HTML", "Python"],
    answer: 2
  }
];

// ── Storage Helpers ───────────────────────────────────────────────────────────
function saveProgress(progress) {
  sessionStorage.setItem("progress", JSON.stringify(progress));
}

function loadProgress() {
  try {
    const raw = sessionStorage.getItem("progress");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveScore(score) {
  localStorage.setItem("score", String(score));
}

function loadScore() {
  return localStorage.getItem("score");
}

// ── Render Questions ──────────────────────────────────────────────────────────
function renderQuestions(savedProgress) {
  const container = document.getElementById("questions");
  container.innerHTML = "";

  quizData.forEach((q, qIdx) => {
    const card = document.createElement("div");
    card.className = "question-card";
    card.style.animationDelay = `${qIdx * 0.07}s`;

    const qNumber = document.createElement("div");
    qNumber.className = "q-number";
    qNumber.textContent = `QUESTION ${qIdx + 1} OF ${quizData.length}`;

    const qText = document.createElement("div");
    qText.className = "q-text";
    qText.textContent = q.question;

    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options";

    q.options.forEach((opt, oIdx) => {
      const label = document.createElement("label");
      label.className = "option-label";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `q${qIdx}`;
      radio.value = oIdx;

      // Restore saved answer from session storage
      if (savedProgress[qIdx] !== undefined && savedProgress[qIdx] === oIdx) {
        radio.checked = true;
      }

      radio.addEventListener("change", () => {
        const progress = loadProgress();
        progress[qIdx] = oIdx;
        saveProgress(progress);
      });

      const span = document.createElement("span");
      span.className = "option-text";
      span.textContent = opt;

      label.appendChild(radio);
      label.appendChild(span);
      optionsDiv.appendChild(label);
    });

    card.appendChild(qNumber);
    card.appendChild(qText);
    card.appendChild(optionsDiv);
    container.appendChild(card);
  });
}

// ── Score Display ─────────────────────────────────────────────────────────────
function displayScore(score) {
  const scoreDiv = document.getElementById("score");
  const total = quizData.length;

  scoreDiv.innerHTML = `
    <div class="score-box">
      <div class="score-circle">${score}/${total}</div>
      <div class="score-text">
        <h2>Your score is ${score} out of ${total}.</h2>
        <p>${score === total ? "🎉 Perfect score!" : score >= 3 ? "Good effort! Keep learning." : "Keep practicing — you'll get there."}</p>
      </div>
    </div>
  `;
}

// ── Submit Handler ────────────────────────────────────────────────────────────
function handleSubmit() {
  const progress = loadProgress();
  let score = 0;

  quizData.forEach((q, qIdx) => {
    if (progress[qIdx] !== undefined && progress[qIdx] === q.answer) {
      score++;
    }
  });

  saveScore(score);
  displayScore(score);
}

// ── Init ──────────────────────────────────────────────────────────────────────
(function init() {
  const savedProgress = loadProgress();
  renderQuestions(savedProgress);

  document.getElementById("submit").addEventListener("click", handleSubmit);

  // Restore last score if it exists (after page refresh post-submit)
  const lastScore = loadScore();
  if (lastScore !== null) {
    displayScore(Number(lastScore));
  }
})();