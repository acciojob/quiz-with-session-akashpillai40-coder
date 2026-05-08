document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll("#questions input[type='radio']");
  const submitBtn = document.getElementById("submit");
  const scoreDisplay = document.getElementById("score");

  const correctAnswers = {
    q1: "Paris",
    q2: "Everest",
    q3: "Blue",
    q4: "Earth",
    q5: "Shakespeare"
  };

  const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
  for (let key in savedProgress) {
    const selected = document.querySelector(
      `input[name='${key}'][value='${savedProgress[key]}']`
    );
    if (selected) {
      selected.checked = true;
      selected.setAttribute("checked", "true");
    }
  }

  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreDisplay.textContent = `Your score is ${savedScore} out of 5.`;
  }

  questions.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      const name = e.target.name;
      const value = e.target.value;
      savedProgress[name] = value;
      sessionStorage.setItem("progress", JSON.stringify(savedProgress));

      document.querySelectorAll(`input[name='${name}']`).forEach(r => r.removeAttribute("checked"));
      e.target.setAttribute("checked", "true");
    });
  });

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
