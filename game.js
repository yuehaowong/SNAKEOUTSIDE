//Step 1: set up game loop (set interval) to constant update game render (i.e. snake & food position, and all game calcs on a set time)
//recall game function
//the 'main's' purpose is to loop over and over infinitely, and time 
// setTimeOut() is the function to replace this (if we have time)
// the renderTime allows us to define the snake's speed (movement per second)


import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

// const SNAKE_SPEED = 2; << exported to snake.js



function main(currentTime) {
    //condition to lose
    if (gameOver) {
        if (confirm('You LOOOSE')) {
            window.location = '/'
        }
        return;
    }


  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return


  
  lastRenderTime = currentTime;

    //GAME LOGIC SECTION
    //most games have 2 steps: 
            //1.update loop (update logic for the game -- move the snake to new position, update if food was eaten (make snake longer) but not actually draw it, )
            //2. draw will take all of update's logic, and draw everythign into the correct logic
  update()
  draw()
}

//might not be needed
window.requestAnimationFrame(main)


//see first line of this code for imports -- called from snake.js
function update() {
  updateSnake()
  updateFood()
  //if the snake runs into a wall or itself
  checkDeath()
}
  

function draw() {
  gameBoard.innerHTML = ''  //this clears the previous pieces behind it (ensures no snake poop or infinite growth)
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

// if the snakehead is outside the grid OR snake intersects itself
function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}
  
