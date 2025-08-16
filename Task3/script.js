const quizData = [
  {
    question: "1. What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperlinks Text Marking Language"
    ],
    answerIndex: 0
  },
  {
    question: "2. Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answerIndex: 2
  },
  {
    question: "3. Inside which HTML element do we put JavaScript?",
    options: ["<script>", "<js>", "<javascript>", "<code>"],
    answerIndex: 0
  },
  {
    question: "4. Which company developed Java?",
    options: ["Oracle", "Microsoft", "Sun Microsystems", "Google"],
    answerIndex: 2
  },
  {
    question: "5. Which symbol is used for comments in CSS?",
    options: ["// comment", "/* comment */", "<!-- comment -->", "# comment"],
    answerIndex: 1
  }
];

let currentQuestion = 0;
let score = 0;

const quiz = document.getElementById("quiz");
const submitBtn = document.getElementById("submit");
const result = document.getElementById("result");

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function loadQuiz() {
  const q = quizData[currentQuestion];
  quiz.innerHTML = `
    <div class="question">${q.question}</div>
    <ul class="options">
      ${q.options
        .map(
          (opt, i) => `
        <li>
          <label>
            <input type="radio" name="answer" value="${i}">
            ${escapeHtml(opt)}
          </label>
        </li>`
        )
        .join("")}
    </ul>
  `;
}

function getSelectedIndex() {
  const el = document.querySelector('input[name="answer"]:checked');
  return el ? parseInt(el.value, 10) : null;
}

submitBtn.addEventListener("click", () => {
  const idx = getSelectedIndex();
  if (idx === null) {
    alert("Please select an answer!");
    return;
  }
  if (idx === quizData[currentQuestion].answerIndex) score++;

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuiz();
  } else {
    quiz.innerHTML = "";
    submitBtn.style.display = "none";
    result.textContent = `You scored ${score} out of ${quizData.length}! 🎉`;
  }
});

loadQuiz();
