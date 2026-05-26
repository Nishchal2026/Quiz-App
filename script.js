
let timeLeft = document.querySelector(".time-left")
let quizContainer = document.querySelector(".container")
let nextBtn = document.getElementById("next-btn")
let countOfQuestion = document.querySelector(".number-of-question")
let displayContainer = document.querySelector(".display-container")
let scoreContainer = document.querySelector(".score-container");
let Restart = document.getElementById("restart")
let userScore = document.getElementById("user-score")
let startScreen = document.querySelector(".start-screen")
let startButton = document.getElementById("start-button")
let questionCount;
let scoreCount = 0  
let count = 11
let countdown;

const quizArray = [ 
  {
    id: "0",
    question: "What is the name of the town where Stranger Things takes place?",
    options: ["Hawkins", "Riverdale", "Hill Valley", "Sunnydale"],
    correct: "Hawkins"
  },

  {
    id: "1",
    question: "What is Eleven's favorite food?",
    options: ["Pizza", "Waffles", "Burger", "Ice Cream"],
    correct: "Waffles"
  },

  {
    id: "2",
    question: "What is the alternate dimension called in Stranger Things?",
    options: ["Dark World", "The Void", "Upside Down", "Shadow Realm"],
    correct: "Upside Down"
  },

  {
    id: "3",
    question: "Who is the police chief of Hawkins?",
    options: ["Jim Hopper", "Steve Harrington", "Bob Newby", "Billy Hargrove"],
    correct: "Jim Hopper"
  },

  {
    id: "4",
    question: "What game do the boys often play together?",
    options: ["Chess", "Dungeons & Dragons", "Monopoly", "Fortnite"],
    correct: "Dungeons & Dragons"
  }
];
 

// Restart Quiz 

Restart.addEventListener("click" , () => {
  initial()
  displayContainer.classList.remove("hide") 
  scoreContainer.classList.add("hide")

})

// Click on Next Button

const displayNextQuestion = () => {
  questionCount += 1

  // if last question 

    if(questionCount == quizArray.length){
      // hide question container and display score container 
 
      displayContainer.classList.add("hide")
      scoreContainer.classList.remove("hide")

      userScore.innerHTML = `Your score is ${scoreCount} out of ${questionCount}`

    }else{
      // display questionCount 

      countOfQuestion.innerHTML = `${questionCount+1} of ${quizArray.length} Questions ( Stranger Things Web Series )`
displayQuiz(questionCount)
count = 11
clearInterval(countdown)
timerDisplay()
    }

} 
 
nextBtn.addEventListener("click" , () => {
  displayNextQuestion()
})


// Timer Display 

const timerDisplay = () => {

  countdown = setInterval(() => {
        count--
        timeLeft.innerHTML = `${count}s`
        if(count==0){
          clearInterval(countdown)
          displayNextQuestion()
        }
  },1000)

}

// Display Quiz 

const displayQuiz = (questionCount) => {
  const quizCards = document.querySelectorAll(".container-mid")

  quizCards.forEach((curElem) => {
    curElem.classList.add("hide")
  })

  quizCards[questionCount].classList.remove("hide")

}

// Create the quiz 

const quizCreator = () => {
  
  // random sort questions
  
  quizArray.sort(() => Math.random() - 0.5)
  
  for(let i of quizArray){

  // random sort options

  i.options.sort(() => Math.random() - 0.5)

    let Div = document.createElement("div")

    Div.classList.add("container-mid")

    // Question Number 

    countOfQuestion.innerHTML = `1 of ${quizArray.length} Questions  ( Stranger Things Web Series )`

    let question_DIV = document.createElement("h1")
    question_DIV.classList.add("question")
    question_DIV.innerHTML =  `${i.question}`
    Div.appendChild(question_DIV)

    Div.innerHTML += `
    
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>   
  <button class="option-div" onclick="checker(this)">${i.options[1]}</button>   
  <button class="option-div" onclick="checker(this)">${i.options[2]}</button>   
  <button class="option-div" onclick="checker(this)">${i.options[3]}</button>   

    `

    quizContainer.appendChild(Div)

}

}

// when user click on start button then quiz started 

startButton.addEventListener("click" , () => {
  startScreen.classList.add("hide")
  displayContainer.classList.remove("hide")
  initial()
})

// Check if the Selected option is correct or not 

const checker = (userOption) => {
  const userSolution = userOption.innerText
  let question = document.getElementsByClassName("container-mid")[questionCount]

  let options = question.querySelectorAll(".option-div")

  // if user clicked answer == correct options stored in object 

  if(userSolution == quizArray[questionCount].correct)
    {
        userOption.classList.add("correct")
        scoreCount++
      }else{
        
        userOption.classList.add("incorrect")

        // for knowing the correct answer 

        options.forEach((curElem) => {
          if(curElem.innerText == quizArray[questionCount].correct){
            curElem.classList.add("correct")
          }
           
        })
  }

  // clear Interval and stop the timer 

  clearInterval(countdown)
//   Disable all buttons

options.forEach((curElem) => {
  curElem.disabled = true
  curElem.style.color = "black"
})


}

// This is the initial phase 

const initial = () => {
  quizContainer.innerHTML = ""
  questionCount = 0
  count = 11
  scoreCount = 0
  clearInterval(countdown)
  timerDisplay()
  quizCreator()
  displayQuiz(questionCount)

}

// Hide quiz and display start screen 

window.onload = () => {
startScreen.classList.remove("hide")
displayContainer.classList.add("hide")
 
} 




 