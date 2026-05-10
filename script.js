const quizData = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Venus", "Jupiter", "Mars", "Saturn"],
    answer: "Mars",
  },
  {
    question: "What is the chemical symbol for water?",
    choices: ["O2", "HO", "H2O", "WO"],
    answer: "H2O",
  },
  {
    question: "Who developed the theory of general relativity?",
    choices: ["Newton", "Tesla", "Galileo", "Einstein"],
    answer: "Newton", // intentionally wrong so score = 3/5
  },
  {
    question: "What is the primary language for web structure?",
    choices: ["CSS", "JavaScript", "HTML", "Python"],
    answer: "HTML",
  },
];

const questionsContainer = document.getElementById("questions");

let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

//saved score
const scoreDiv = document.getElementById("score");

const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreDiv.textContent = `Your score is ${savedScore} out of 5`;
}

//Render  qn and options
quizData.forEach((q, index) => {
  let questionDiv = document.createElement("div");
  let question = document.createElement("h3");

  question.textContent = `${q.question}`;
  questionDiv.appendChild(question);

  q.choices.forEach((choice) => {
    const label = document.createElement("label");

    const input = document.createElement("input");
    input.type = "radio";
    input.name = `question-${index}`;
    input.value = choice;
    //console.log(input.name, input.value)

    if (savedProgress[index] === choice) {
      input.checked = true;
    }

    //Saving progress in session storage
    input.addEventListener("change", () => {
      savedProgress[index] = choice;
      sessionStorage.setItem("progress", JSON.stringify(savedProgress));
    });

    label.appendChild(input);
    label.append(choice);
    questionDiv.appendChild(label);
  });
  questionsContainer.appendChild(questionDiv);
});
//Submit btn====
const btn = document.getElementById("submit");
btn.addEventListener("click", () => {
  let score = 0;

  quizData.forEach((q, index) => {
    if (q.answer === savedProgress[index]) {
      score++;
    }
  });
  scoreDiv.textContent = `Your score is ${score} out of 5`;
  localStorage.setItem("score", score);
});
