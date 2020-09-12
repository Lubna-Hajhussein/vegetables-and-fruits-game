//fetch data
//apple
const appleDiv = document.querySelector("#apple");
const cherryDiv = document.querySelector("#cherry");
const tomatoDiv = document.querySelector("#tomato");
const puzzle = document.querySelector("#puzzle")
const num = document.querySelector("#gusses")
const next = document.querySelector('#next')

const data = [
  { name: "apple", remainingGuesses: 3, div: appleDiv },
  { name: "cherry", remainingGuesses: 3, div: cherryDiv },
  { name: "tomato", remainingGuesses: 3, div: tomatoDiv },
];

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//time part
const starttimestamp = new Date().getTime()


let vegetablesLost = 0
let vegetablesWon = 0

  let defaultIndex = 0
  let type = data[defaultIndex]
  if(defaultIndex===0){
    const guesses = []
    const name = type.name
    const div = type.div
    type.div.hidden = false
    const defaultName = name.split("").map((letter)=>"*").join('')
    puzzle.textContent = defaultName
    num.textContent = type.remainingGuesses +" guesses left"
    window.addEventListener("keypress",(e)=>{
      store = ""
      guesses.push(e.key)
      if(!type.name.split("").includes(e.key)){
        type.remainingGuesses--
      }
      num.textContent = type.remainingGuesses +" guesses left"
      if(type.remainingGuesses<=0){
        num.textContent = `the word was`
        puzzle.textContent = type.name
        return;
      }
      type.name.split("").forEach((letter)=>{
   
        store +=  !guesses.includes(letter)?"*":letter
     })
     puzzle.textContent = store
     
    })
  
  }
 
  next.addEventListener("click",()=>{
    const takenTimeEle = document.querySelector("#timeTaken")
    const vegetablesWonEle = document.querySelector("#vegetablesWon")
    const vegetablesLostEle = document.querySelector("#vegetablesLost")

    //check if won or lost 
    if(puzzle.textContent.split("").every((letter)=>letter!=="*")){
      vegetablesWon++
    }else{
      vegetablesLost++
    }
    defaultIndex++
    type = data[defaultIndex]
    if(defaultIndex===data.length){
      const finishedtimestamp = new Date().getTime()
      const seconds =  Number.parseInt((finishedtimestamp-starttimestamp)/1000)
      vegetablesWonEle.textContent = `vegetables-won: ${vegetablesWon}`
      vegetablesLostEle.textContent = `vegetables-lost: ${vegetablesLost}`
      takenTimeEle.textContent = `time-taken: ${seconds} seconds`
      modal.style.display = "block";
      return;
    }
  data.forEach((fruit)=>{
    if(data.indexOf(fruit)===defaultIndex){
      fruit.div.hidden = false
      const guesses = []
      const name = type.name
      const div = type.div
      type.div.hidden = false
      const defaultName = name.split("").map((letter)=>"*").join('')
      puzzle.textContent = defaultName
      num.textContent = type.remainingGuesses +" guesses left"
      window.addEventListener("keypress",(e)=>{
        store = ""
        guesses.push(e.key)
        if(!type.name.split("").includes(e.key)){
          type.remainingGuesses--
        }
        num.textContent = type.remainingGuesses +" guesses left"
        if(type.remainingGuesses<=0){
          num.textContent = `the word was`
          puzzle.textContent = type.name
          return;
        }
        type.name.split("").forEach((letter)=>{
     
          store +=  !guesses.includes(letter)?"*":letter
       })
       puzzle.textContent = store
       
      })
    }else{
      fruit.div.hidden = true
    }
  })
 // puzzle.textContent = defaultName
})
 


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  location.reload()
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    location.reload()
    modal.style.display = "none";

  }
  
}