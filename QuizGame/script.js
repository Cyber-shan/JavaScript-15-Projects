const startScreen = document.getElementById("start-screen")
const quizScreen = document.getElementById("question-form")
const quizResults = document.getElementById("quiz-results")
const getQuestion = document.getElementById("question")
const eachScore = document.getElementById("total-score")

const currentQuestion = document.getElementById("current-question")
const totalQuestion = document.getElementById("total-question")

const startButton = document.getElementById("start-button")
const answerContainer = document.getElementById("answer-buttons")
const restartButton = document.getElementById("restart-btn")

const correctAnswer = document.getElementById("correct-answer")
const resultMessage = document.getElementById("result-message")

const progressBar = document.getElementById("progress")

const quizQuestions = [
    {
        question: "What does Html stand for?",
        answer: [
          {text: "Hyper Tool Markup Language", correct: false},
          {text: "Hyperlinks and Text Markup Language", correct: false},
          {text: "Hyper Text Markup Language", correct: true},
          {text: "Home Tool Markup Language", correct: false}
        ]
    },
    {
        question: "Which of the following is NOT a programming language?",
        answer:[
            {text: "Python", correct: false},
            {text: "Java", correct: false},
            {text: "Html", correct: false},
            {text: "MySQl", correct: true}
        ]
    },
    {
        question: "What does CSS primarily control?",
        answer: [
            {text: "The structure of a webpage", correct: false},
            {text: "The logic of a webpage", correct: false},
            {text: "The style and layout of a webpage", correct: true},
            {text: "The database connections of a webpage", correct: false}
        ]
    },
    {
        question: "In Java, which keyword is used to create a new objet?",
        answer: [
            {text: "This", correct: false},
            {text: "Static", correct: false},
            {text: "New", correct: true},
            {text: "Object", correct: false},
        ]
    },
    {
        question: "Which one is the correct way to declare a function in Javascript?",
        answer: [
            {text: "function = myFunc()", correct: false},
            {text: "def myFunch()", correct: false},
            {text: "function myFunc()", correct: true},
            {text: "create function myFunc()", correct: false}
        ]
    }
]

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;
totalQuestion.textContent = quizQuestions.length

//Event listeners
startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restartQuiz)
function startQuiz(){
    currentQuestionIndex =  0;
    score  = 0;
    eachScore.textContent = 0;
    startScreen.classList.remove("active")
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion(){
    // reset
    answersDisabled = false;

    const Question = quizQuestions[currentQuestionIndex]
    getQuestion.textContent = Question.question

    currentQuestion.textContent = currentQuestionIndex +  1;
 
    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100
    progressBar.style.width = progressPercent + "%"
    
    answerContainer.innerHTML = ""

    Question.answer.forEach((answer) => {
        const button = document.createElement("button")
        button.textContent = answer.text
        button.classList.add("answer-button")
        
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer)

        answerContainer.appendChild(button)
    })  

}

function selectAnswer(event){
     if (answersDisabled) return;

     answersDisabled = true;

     const selectedButton = event.target;
     const correctButton = selectedButton.dataset.correct === "true";

     
     Array.from(answerContainer.children).forEach((button) => {
        if(button.dataset.correct === "true"){
          button.classList.add("correct")
        } else if (button === selectedButton)(
            button.classList.add("incorrect")
        )
     })
    
     if(correctButton){
        score++
        eachScore.textContent = score
     }
    
    setTimeout(() => {
         currentQuestionIndex++

        if(currentQuestionIndex < quizQuestions.length){
            showQuestion();
        } else {
            showResults();
        }
    }, 1000)
}


function showResults(){
    quizScreen.classList.remove("active");
    quizResults.classList.add("active")

    correctAnswer.textContent = score;

     const percentage = (score / quizQuestions.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
    }
}


function restartQuiz(){
  quizResults.classList.remove("active")
  startQuiz();
}