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

const qDiv = document.getElementById("questions");
const scoreDiv = document.getElemntById("score")

let savedProgress =
  JSON.parse(sessionStorage.getItem("progress")) || {};

        //---------Display question
quizData.forEach((q, index) => {
	const qContainer = document.createElement("div");
	const qTitle = document.createElement("h3");
	qTitle.textContent = `${index + 1}. ${q.question}`

	qContainer.appendChild(qTitle);

	   //----------Display options
	q.options.forEach((option) => {
		qContainer.innerHTML += `
	<label>
		<input
		type="radio"
		name="question-${index}"
		value="${option}"
		> ${option}
	</label>
	<br>
		`;
	})
	qDiv.appendChild(qContainer);
});
   ///Storing final score ====> local storage
let score = localStorage.setItem("score");
const savedScore = localStorage.getItem("score");

if(savedScore !== null) {
	scoreDiv.textContent = `Your score is ${savedScore} out of 5`
}


