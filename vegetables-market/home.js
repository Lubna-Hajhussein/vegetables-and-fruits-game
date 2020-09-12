const firstColumn = document.querySelector("#firstColumn")
const secondColumn = document.querySelector("#secondColumn")
const thirdColumn = document.querySelector("#thirdColumn")
const forthColumn = document.querySelector("#forthColumn")
const fifthColumn = document.querySelector("#fifthColumn")

const fetchData = Array.from(firstColumn.children).concat(Array.from(secondColumn.children)).concat(Array.from(thirdColumn.children)).concat(Array.from(forthColumn.children)).concat(Array.from(fifthColumn.children))

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//time part
const starttimestamp = new Date().getTime()


let vegetables = []
let vegetablesDropdown = document.querySelector("#dropdown")

fetchData.forEach((div)=>{
    //the name of the fruit is the id of its DOM
    vegetables.push({div:div,name:div.id,image:div.children[0].src,imageElem:div.children[0]})
})

//the Dom contains the image


let vegetablesLost = 0
let vegetablesWon = 0

vegetables.forEach((vegetable)=>{
   const div = vegetable.div
   const image = vegetable.image
   const name = vegetable.name
   const imageElem = vegetable.imageElem
   let flag = true

function eventListenerFunc(){
    if(flag){
     div.removeEventListener("click",eventListenerFunc)
    }
    const options = Array.from(vegetablesDropdown.children)
       if( options.length!==0){
      if(name===vegetablesDropdown.value){
          vegetablesWon++
          flag = false
          div.style.background = "rgb(127, 255, 0)"
          div.style.border = "3px solid #7FFF00"
          
        
         
      }else if(name!==vegetablesDropdown.value){
        vegetablesLost++
        flag = false
        
        div.style.background = "red"
        div.style.border = "3px solid red"
        
        
        //imageElem.hidden = true
      }
      const targetOption = options.find((option)=>option.value===name)
      targetOption.remove()
    }
 
    if(options.length===1){
        const takenTimeEle = document.querySelector("#timeTaken")
        const vegetablesWonEle = document.querySelector("#vegetablesWon")
        const vegetablesLostEle = document.querySelector("#vegetablesLost")
        const finishedtimestamp = new Date().getTime()
        
       
        const seconds =  Number.parseInt((finishedtimestamp-starttimestamp)/1000)
        vegetablesWonEle.textContent = `vegetables-won: ${vegetablesWon}`
        vegetablesLostEle.textContent = `vegetables-lost: ${vegetablesLost}`
        takenTimeEle.textContent = `time-taken: ${seconds} seconds`
        modal.style.display = "block";
    }
   }

   div.addEventListener("click",eventListenerFunc)
   
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
