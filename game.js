const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "what is 2 + 2?",
        choice1: "2",
        choice2: "4",
        choice3: "5",
        choice4: "8",
        answer: 2,
    },
    {
        question: "what is my dogs name?",
        choice1: "Riley",
        choice2: "Dogmeat",
        choice3: "Pookie",
        choice4: "Cuddle-Bug",
        answer: 1,
    },
    {
        question: "Is my dog a good boy?",
        choice1: "nah, he's fat",
        choice2: "ew, I don't like him",
        choice3: "He's ok, I guess...",
        choice4: "OMG! Yes. I love him.",
        answer: 4,
    },
    {
        question: "what this educational?",
        choice1: "91.412 million miles",
        choice2: "7.837 billion as of 2021",
        choice3: "It was educational for you to build this and that's what really mattered",
        choice4: "The Triassic Period",
        answer: 3,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.getElementsByClassName.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventlistener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout (() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()


        }, 1000)
    })
})

incrementScore = num => {
    score +=num.scoreText.innerText = scoreText
}

startGame()