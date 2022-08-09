
import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'

//eventually will make food random //zero is not a grid option! must start at 1
let food = getRandomFoodPosition()

//Set up expansion rate of how much the snake grows from eating food
const EXPANSION_RATE = 1  //gains one new segment everytime it eats food



export function update() {
 //checks if snake is on top of food meaning it ate it
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE)
    food = getRandomFoodPosition() //this is random
  }
}

//draw in the food element
export function draw(gameBoard) {
  const foodElement = document.createElement('div')
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.classList.add('food')
  gameBoard.appendChild(foodElement)
}


//RANDOMLY PLACE FOOD WITH CONDITIONS: if our food is not null or is on the snake already then we want to return a new food position
function getRandomFoodPosition() {
  let newFoodPosition
  //loop until it gives a valid output (not on snake)
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }
  return newFoodPosition
}