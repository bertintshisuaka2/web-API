// DECLARATIONS

// VAR TIMER   (global) 
var time = document.querySelector(".timer");
var score = document.querySelector("#score");
var secondsLeft = 90;

//VAR  BUTTONS (global )
const start = document.querySelector("#start");

// VAR FOR INTRO/START
const codersIntro = document.querySelector("#challenge-begins");

//CALL END LOAD EMLEMENT VAR
var questionsEl = document.querySelector(".all-question");

// ELEMENT LOCATIONS VAR
let questionEl = document.querySelector("#question");
const correctWrong = document.querySelector("#right-wrong");
let questionCount = 0;


// FINAL SCORE VAR
const finalEl = document.querySelector("#final-score");
let initialsInput = document.querySelector("#initials");

// HIGHSCORE VAR 
const highscoresEl = document.querySelector("#high-scores");
let scoreListEl = document.querySelector(".score-list");
let scoreList = [];

// CALL OUT THE ANSWER CLASS BUTTON
const ansBtn = document.querySelectorAll("button.answer-btn")

// VAR SUBMITINT, GO, CLEAR, VIEW
let submitScrBtn = document.querySelector("#submit-score");
let clearScrBtn = document.querySelector("#clearScores");
let viewScrBtn = document.querySelector("#view-scores");
let goBackBtn = document.querySelector("#goBack");


// VAR ANSER CALL
const ans1Btn = document.querySelector("#answer-1");
const ans2Btn = document.querySelector("#answer-2");
const ans3Btn = document.querySelector("#answer-3");
const ans4Btn = document.querySelector("#answer-4");



// ARRAY OF FIVE QUESTION, ZERO BASED, NUMBER CORECTLY. 
const questions = [ 
    {
        question: "What is the meaning of HTML ",
        answers: ["1.Hot technical model language", "2. Hyper Text Mark up Language", "3. Hyper text make up language", "4. Higth Technology Modern Language"],
        correctAnswer: "1"
    },
    {
        question: "What is the meaning of CSS?",
        answers: ["1. Code system secured;", "2. Cascading Code System;", "3. Code social system;", "4. Cascading Style Sheet;"],
        correctAnswer: "3"
    },
    {
        question: "How to write an IF statement in JavaScript?",
        answers: ["1. if i == 5 then", "2. if i = 5 then", "3. if (i == 5)", "4. if i = 5"],
        correctAnswer: "2"
    },
    {
        question: "What is the meaning of GUI",
        answers: ["1. Graphic United interface", "2. Graphic User Interface", "3.Graph Unified Internet", "4.Graphic Union Internal"],
        correctAnswer: "1"
    },
    {
        question: "What symbole do we use to represent array",
        answers: ["1. ()", "2. //", "3. {}", "4. []"],
        correctAnswer: "3"
    }
];

// TIMER FUNCTION STARTS PROCESS 
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        time.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            score.textContent = secondsLeft;
        }
    }, 1000);
}

// QUIZ BEGIN FUNCTION
function startQuiz() {
    codersIntro.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

// SET QUESTION FUNCTION
function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
}

// EVENT FUNCTION CHECK ANSWERS BEGING PROCESS
function checkAnswer(event) {
    event.preventDefault();

    //CREATING ELEMENT OF RIGHT OR WRONG
    correctWrong.style.display = "block";
    let p = document.createElement("p");
    correctWrong.appendChild(p);

    // DISPLAY NEW ELEMENT FOR X AMOUNR OF TIME
    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    // RIGHT OR WRONG ANSWER CONDITIONAL STATEMENTS CORRECT
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } 
   
     // RIGHT OR WRONG ANSWER CONDITIONAL STATEMENTS WRONG
    else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }

    // CYCLE 
    if (questionCount < questions.length) {
        questionCount++;
    }
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    // HIGH SCORE SORTING LIST
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    // STORAGE OF SCORE 
    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
    // Parsing the JSON string to an object
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    // WHEN RETRIEVED FROM LOCAL, ARRAY
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

// CLEAR THE STORE
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}

// START OFF ALL EVENT 
// Start timer and display first question when click start quiz
start.addEventListener("click", startQuiz);

// CHECK ANSWER LISTENER EVENT
ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

// ADDING A SCORE EVENT
submitScrBtn.addEventListener("click", addScore);

// GO BACK LISTENER EVENT FUNCTION 
goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    codersIntro.style.display = "block";
    secondsLeft = 75;
    time.textContent = `Time:${secondsLeft}s`;
});

// CLEAR SCORE
clearScrBtn.addEventListener("click", clearScores);

// HIGH SCORE BUTTON ALERT AND DISPLAY LISTENER EVENT
viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } 
    else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } 
    
    else {
        return alert("Take Quiz. Be the highest score.");
    }
});