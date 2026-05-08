const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    question: "Which language runs in browser?",
    options: ["Python", "Java", "JavaScript", "C++"],
    answer: "JavaScript",
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
];

const qDiv = document.getElementById("questions");
const scoreDiv = document.getElementById("score");
const submitBtn = document.getElementById("submit");

let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

const savedScore = localStorage.getItem("score");

if (savedScore !== null) {
  scoreDiv.textContent = `Your score is ${savedScore} out of 5.`;
}

quizData.forEach((q, index) => {
  const qContainer = document.createElement("div");
  qContainer.textContent = q.question;

  q.options.forEach((option) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");

    radio.type = "radio";
    radio.name = `question-${index}`;
    radio.value = option;

    if (savedProgress[index] === option) {
      radio.checked = true;
      radio.setAttribute("checked", "true");
    }

    radio.addEventListener("change", () => {
      document
        .querySelectorAll(`input[name="question-${index}"]`)
        .forEach((r) => r.removeAttribute("checked"));

      radio.checked = true;
      radio.setAttribute("checked", "true");

      savedProgress[index] = option;
      sessionStorage.setItem("progress", JSON.stringify(savedProgress));
    });

    label.appendChild(radio);
    label.append(option);

    qContainer.appendChild(label);
  });

  qDiv.appendChild(qContainer);
});

submitBtn.addEventListener("click", () => {
  let score = 0;

  quizData.forEach((q, index) => {
    if (savedProgress[index] === q.answer) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});