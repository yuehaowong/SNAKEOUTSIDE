import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 5  //if speed if 5, its 5 times quicker, higher numebr is faster
// represent snake in x/y position, this is center of our grid (21x21... divided by 2 = ~11)
// x10-x12, the snake is 3 squares long, vertically
const snakeBody = [{ x: 10, y: 11 }];
let newSegments = 0;


export function update() {
  addSegments()
  //use for loop, start from 2nd to last element from snake 
  //call inputDirection from input.js
  const inputDirection = getInputDirection()
  
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i]}
  }  
    //THIS IS SNAKE MOVING, 0 is the head, x & y position of the head
    //REMEMBER: -ve y moves it UP !    +ve y moves it DOWN!
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

export function draw(gameBoard) {
  //pass in gameBoard to draw snake on to gameboard to allow the snake to be drawn on the board
  //loop through each pieces of our snake body to draw onto our gameboard
   snakeBody.forEach(segment => {
     //create div element to go inside game board at a particular x-y coordinate
     const snakeElement = document.createElement('div')
     //set the x & y position - it should be like a graph (x) horizontal, y (vertical) 
     //clarification: columns are straght lines upward (representing each position of x)
     snakeElement.style.gridRowStart = segment.y
     snakeElement.style.gridColumnStart = segment.x
     //line below is to access our snake's color
     snakeElement.classList.add('snake')
     //nothing will work unless gameBoard is passed in from game.js. once the below line is populated a blue dot (the snake) will pop up on your run code
     gameBoard.appendChild(snakeElement)
   })
}



// when food is eaten. how much we expand. default of newSegemnt is 0 becuase the snake is not growing.
export function expandSnake(amount) {
  newSegments += amount
}

//when the food is on the snake. if the position on the snake?
//ignore head will be false if we dont pass the head in, pass in an empty object incase we dont pass in anything
export function onSnake(position, { ignoreHead = false } = {}) {
    //loop through each segment, to check if it's on the snake. .some checks if ANY of the snake body is the same as the position passed in, it returns true
    //if ignore head is true & the index is 0 (on the head) --completely ignore the head, now we can compare all over parts of the snake to the head
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPositions(segment, position)
  })
}

//FOR GAMEOVER: need to know where the snake head is - did it intesect with any of its body parts?
export function getSnakeHead() {
  return snakeBody[0]
}

//FOR GAMEOVER: determine if the snake intersected itself - did the HEAD touch any other part?
//the head of the snake will always be on teh ehad of the snake -- pass this onto the 'onSnake'
export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true })
}


//if our two positions are exactly the same it will return onSnake true
function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y
}

//LETS OUR SNAKE GROW. this will duplicate a snakebody and push it to the end of our snake
function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    //taking last el of snake and duplicating it onto the snake
    snakeBody.push({ ...snakeBody[snakeBody.length - 1]})
  }

  //this ensures it doesn't ifinity add to thelength (stops endless growth)
  newSegments = 0;
}