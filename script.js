const quizData = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris", // first = correct
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["K2", "Mount Everest", "Kilimanjaro", "Denali"],
    answer: "Mount Everest", // first = wrong
  },
  {
    question: "What is the largest country by area?",
    choices: ["USA", "China", "Russia", "Canada"],
    answer: "Russia", // first = wrong
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Jupiter", "Earth", "Mars", "Venus"],
    answer: "Jupiter", // first = correct
  },
  {
    question: "What is 5 + 3?",
    choices: ["8", "6", "7", "9"],
    answer: "8", // first = correct
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