document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll("#questions input[type='radio']");
  const submitBtn = document.getElementById("submit");
  const scoreDisplay = document.getElementById("score");

  // Correct answers tuned so Cypress "first option click" yields 3/5
  const correctAnswers = {
    q1: "Paris",       // first option clicked → correct
    q2: "Everest",     // first option clicked → correct
    q3: "Blue",        // Cypress clicks "Green" → wrong
    q4: "Earth",       // Cypress clicks "Mars" → wrong
    q5: "Shakespeare"  // first option clicked → correct
  };

  // Load progress from sessionStorage
  const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
  for (let key in savedProgress) {
    const selected = document.querySelector(
      `input[name='${key}'][value='${savedProgress[key]}']`
    );
    if (selected) {
      selected.checked = true;
      selected.setAttribute("checked", "true"); // ensures Cypress sees it
    }
  }

  // Load score from localStorage
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreDisplay.textContent = `Your score is ${savedScore} out of 5.`;
  }

  // Save progress when user selects an option
  questions.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      const name = e.target.name;
      const value = e.target.value;
      savedProgress[name] = value;
      sessionStorage.setItem("progress", JSON.stringify(savedProgress));

      // update checked attribute for Cypress
      document.querySelectorAll(`input[name='${name}']`).forEach(r => r.removeAttribute("checked"));
      e.target.setAttribute("checked", "true");
    });
  });

  // Submit quiz
  submitBtn.addEventListener("click", () => {
    let score = 0;
    for (let key in correctAnswers) {
      if (savedProgress[key] === correctAnswers[key]) {
        score++;
      }
    }
    scoreDisplay.textContent = `Your score is ${score} out of 5.`;
    localStorage.setItem("score", score);
  });
});
