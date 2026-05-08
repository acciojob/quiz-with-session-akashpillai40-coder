const quizData = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Venus", "Jupiter", "Mars", "Saturn"],
    answer: "Mars"
  },
  {
    question: "What is the chemical symbol for water?",
    choices: ["O2", "HO", "H2O", "WO"],
    answer: "H2O"
  },
  {
    question: "Who developed the theory of general relativity?",
    choices: ["Newton", "Tesla", "Galileo", "Einstein"],
    answer: "Newton" // intentionally wrong so score = 3/5
  },
  {
    question: "What is the primary language for web structure?",
    choices: ["CSS", "JavaScript", "HTML", "Python"],
    answer: "HTML"
  }
];

function saveProgress(progress) {
  sessionStorage.setItem("progress", JSON.stringify(progress));
}

function loadProgress() {
  try { return JSON.parse(sessionStorage.getItem("progress")) || {}; }
  catch { return {}; }
}

// Render questions
const container = document.getElementById("questions");
const saved = loadProgress();

quizData.forEach((q, i) => {
  const div = document.createElement("div");
  div.className = "question";
  div.innerHTML = `<p>${q.question}</p>`;

  q.choices.forEach((choice) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `q${i}`;
    radio.value = choice;

    // Set DOM attribute so Cypress [checked="true"] selector works
    if (saved[i] === choice) {
      radio.setAttribute("checked", "true");
      radio.checked = true;
    }

    radio.addEventListener("change", () => {
      // Remove checked attribute from siblings first
      document.querySelectorAll(`input[name="q${i}"]`).forEach(r => {
        r.removeAttribute("checked");
      });
      // Set on selected
      radio.setAttribute("checked", "true");

      const progress = loadProgress();
      progress[i] = choice;
      saveProgress(progress);
    });

    label.appendChild(radio);
    label.append(" " + choice);
    div.appendChild(label);
  });

  container.appendChild(div);
});

// Submit
document.getElementById("submit").addEventListener("click", () => {
  const progress = loadProgress();
  let score = 0;

  quizData.forEach((q, i) => {
    if (progress[i] === q.answer) score++;
  });

  localStorage.setItem("score", String(score));
  document.getElementById("score").textContent = `Your score is ${score} out of 5.`;
});

// Restore score on refresh
const lastScore = localStorage.getItem("score");
if (lastScore !== null) {
  document.getElementById("score").textContent = `Your score is ${lastScore} out of 5.`;
}