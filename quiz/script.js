const params = new URLSearchParams(window.location.search);

const subject = params.get("subject");
const chapter = params.get("chapter");

const subjectName = document.getElementById("subjectName");
const chapterName = document.getElementById("chapterName");
const question = document.getElementById("question");

const answerInput = document.getElementById("answer");
const submitButton = document.getElementById("submitButton");
const resultSection = document.getElementById("resultSection");
const nextButton = document.getElementById("nextButton");

let questions = [];
let currentQuestion = 0;

let score = 0;
let answered = false;

document.addEventListener("DOMContentLoaded", loadQuiz);

document.addEventListener("DOMContentLoaded", () => {

    nextButton.style.display = "none";

});

async function loadQuiz() {

    try {

        // 科目の情報を取得
        const infoResponse = await fetch(`../subjects/${subject}/info.json`);
        const info = await infoResponse.json();

        subjectName.textContent = info.name;

        // 章名を取得
        const currentChapter = info.chapters.find(c => c.id === chapter);

        if(currentChapter){
            chapterName.textContent = currentChapter.name;
        }

        // 問題を取得
        const questionResponse = await fetch(
            `../subjects/${subject}/chapters/${chapter}.json`
        );

       const data = await questionResponse.json();

questions = data.questions;

        showQuestion();

    } catch(error){

        console.error(error);

        question.textContent = "問題の読み込みに失敗しました。";

    }

}

function showQuestion(){

    const q = questions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        `問題 ${currentQuestion + 1} / ${questions.length}`;

    question.textContent = q.question;

}

document.getElementById("backButton").addEventListener("click", () => {

    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = `../subjects/${subject}/index.html`;
    }

});

submitButton.addEventListener("click", () => {

    if (answered) return;

    const userAnswer = answerInput.value.trim();
    const correctAnswer = questions[currentQuestion].answer;

    resultSection.innerHTML = "";

    if (userAnswer === correctAnswer) {

        resultSection.innerHTML = "⭕ 正解！";
        score++;

    } else {

        resultSection.innerHTML = `❌ 不正解<br>正解：${correctAnswer}`;

    }

    resultSection.innerHTML += `
        <br><br>${questions[currentQuestion].explanation}
    `;

    answered = true;

    submitButton.style.display = "none";
    nextButton.style.display = "block";

});

nextButton.addEventListener("click", () => {

    currentQuestion++;
    answered = false;

    if (currentQuestion >= questions.length) {

        document.getElementById("quiz").innerHTML = `
            <h2>終了！</h2>
            <p>正答数：${score} / ${questions.length}</p>
        `;

        return;
    }

    answerInput.value = "";
    resultSection.innerHTML = "";

    submitButton.style.display = "block";
    nextButton.style.display = "none";

    showQuestion();

});

nextButton.style.display = "none";

