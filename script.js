const quizData = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["K2", "Mount Everest", "Kilimanjaro", "Denali"],
    answer: "Mount Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["USA", "China", "Russia", "Canada"],
    answer: "Russia",
  },
  {
    question: "Who wrote Hamlet?",
    choices: ["Shakespeare", "Dickens", "Austen", "Hemingway"],
    answer: "Shakespeare",
  },
  {
    question: "What is 5 + 3?",
    choices: ["6", "7", "8", "9"],
    answer: "8",
  },
];

const questionsDiv = document.getElementById("questions");
const scoreDiv = document.getElementById("score");
const submitBtn = document.getElementById("submit");

let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

const savedScore = localStorage.getItem("score");

if (savedScore !== null) {
  scoreDiv.textContent = `Your score is ${savedScore} out of 5.`;
}

quizData.forEach((q, index) => {
  const div = document.createElement("div");

  const title = document.createElement("p");
  title.textContent = q.question;
  div.appendChild(title);

  q.choices.forEach((choice) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");

    radio.type = "radio";
    radio.name = `question-${index}`;
    radio.value = choice;

    if (progress[index] === choice) {
      radio.checked = true;
      radio.setAttribute("checked", "true");
    }

    radio.addEventListener("change", () => {
      document
        .querySelectorAll(`input[name="question-${index}"]`)
        .forEach((r) => r.removeAttribute("checked"));

      radio.checked = true;
      radio.setAttribute("checked", "true");

      progress[index] = choice;
      sessionStorage.setItem("progress", JSON.stringify(progress));
    });

    label.appendChild(radio);
    label.append(choice);
    div.appendChild(label);
  });

  questionsDiv.appendChild(div);
});

submitBtn.addEventListener("click", () => {
  let score = 0;

  quizData.forEach((q, index) => {
    if (progress[index] === q.answer) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});