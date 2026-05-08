const quizData = [
  {
    question: "Capital of India?",
    options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
    answer: "Delhi",
  },
  {
    question: "5 + 2 = ?",
    options: ["7", "4", "5", "6"],
    answer: "7",
  },
  {
    question: "HTML stands for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Tool Multi Language",
      "Home Text Markup Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "CSS is used for?",
    options: ["Styling", "Database", "Backend", "Server"],
    answer: "Styling",
  },
  {
    question: "JavaScript is a?",
    options: ["Programming Language", "Database", "Server", "Browser"],
    answer: "Programming Language",
  },
];

const qDiv = document.getElementById("questions");
const scoreDiv = document.getElementById("score");
const submitBtn = document.getElementById("submit");

let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// show saved score
const savedScore = localStorage.getItem("score");

if (savedScore !== null) {
  scoreDiv.textContent = `Your score is ${savedScore} out of 5`;
}

// display questions
quizData.forEach((q, index) => {
  const qContainer = document.createElement("div");
  const qTitle = document.createElement("h3");

  qTitle.textContent = `${index + 1}. ${q.question}`;
  qContainer.appendChild(qTitle);

  q.options.forEach((option) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");

    radio.type = "radio";
    radio.name = `question-${index}`;
    radio.value = option;

    // restore saved answer
    if (savedProgress[index] === option) {
      radio.checked = true;
    }

    // save progress
    radio.addEventListener("change", () => {
      savedProgress[index] = option;
      sessionStorage.setItem("progress", JSON.stringify(savedProgress));
    });

    label.appendChild(radio);
    label.append(option);

    qContainer.appendChild(label);
    qContainer.appendChild(document.createElement("br"));
  });

  qDiv.appendChild(qContainer);
});

// submit
submitBtn.addEventListener("click", () => {
  let score = 0;

  quizData.forEach((q, index) => {
    if (savedProgress[index] === q.answer) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of 5`;

  localStorage.setItem("score", score);
});