fruits.forEach((fruitsObj)=>{
    const ball = fruitsObj.imgEl
    const imgSrc = fruitsObj.img
    const fruitName = fruitsObj.name

//gate is the target 
//ball is the image
let currentDroppable = null;

ball.onmousedown = function(event) {

  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;

  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  document.body.append(ball);

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    ball.style.left = pageX - shiftX + 'px';
    ball.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);

    ball.hidden = true;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    ball.hidden = false;

    if (!elemBelow) return;

    let droppableBelow = elemBelow.closest(`#${fruitName}Target`);

    let wrongTarget = elemBelow.closest(".droppable");
    if(!wrongTarget){
      wrongTarget = elemBelow.closest(".firstdroppable");
    }

     if(!droppableBelow&&wrongTarget){
       console.log(wrongTarget.style.background==="rgb(127, 255, 0)")
       if(wrongTarget.style.background!=="rgb(127, 255, 0)"){
       wrongTarget.style.background = "red"
       wrongTarget.children[0].style.color = "red"
       wrongTarget.style.border = "3px solid red"
       setTimeout(()=>{
        wrongTarget.style.background = "white"
        wrongTarget.children[0].style.color =  "#00008B"
        wrongTarget.style.border = "3px solid #7FFF00"
       },400)
    }
       return;
       
     }
    if (currentDroppable != droppableBelow) {
      if (currentDroppable) { // null when we were not over a droppable before this event
        leaveDroppable(currentDroppable);
      }
      currentDroppable = droppableBelow;
      if (currentDroppable) { // null if we're not coming over a droppable now
        // (maybe just left the droppable)
        enterDroppable(currentDroppable);
      }
    }
  }

  document.addEventListener('mousemove', onMouseMove);

  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};

function enterDroppable(elem) {
  elem.style.background = '#7FFF00';
  elem.children[0].style.color =  "#7FFF00"
}

function leaveDroppable(elem) {
  elem.style.background = '';

  elem.children[0].style.color = "#00008B"
}

ball.ondragstart = function() {
  return false;
};

})