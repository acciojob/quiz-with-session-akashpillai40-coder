// script.js

const quizData = [
  {
    question: "Capital of India?",
    options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
    answer: "Delhi",
  },
  {
    question: "5 + 2 = ?",
    options: ["7", "4", "5", "6"],
    answer: "4",
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

const questionsContainer = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Get saved progress from sessionStorage
let savedProgress =
  JSON.parse(sessionStorage.getItem("progress")) || {};

// Display Questions
quizData.forEach((q, index) => {
  const questionDiv = document.createElement("div");

  const questionTitle = document.createElement("h3");
  questionTitle.textContent = `${index + 1}. ${q.question}`;
  questionDiv.appendChild(questionTitle);

  q.options.forEach((option) => {
    const label = document.createElement("label");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `question-${index}`;
    radio.value = option;

    // Restore checked answer after refresh
    if (savedProgress[index] === option) {
      radio.checked = true;
    }

    // Save answer in sessionStorage
    radio.addEventListener("change", () => {
      savedProgress[index] = option;

      sessionStorage.setItem(
        "progress",
        JSON.stringify(savedProgress)
      );
    });

    label.appendChild(radio);
    label.append(option);

    questionDiv.appendChild(label);
    questionDiv.appendChild(document.createElement("br"));
  });

  questionsContainer.appendChild(questionDiv);
});

// Show previous score from localStorage
const storedScore = localStorage.getItem("score");

if (storedScore !== null) {
  scoreDiv.textContent = `Your score is ${storedScore} out of 5.`;
}

// Submit Quiz
submitBtn.addEventListener("click", () => {
  let score = 0;

  quizData.forEach((q, index) => {
    if (savedProgress[index] === q.answer) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of 5.`;

  // Save score in localStorage
  localStorage.setItem("score", score);
});