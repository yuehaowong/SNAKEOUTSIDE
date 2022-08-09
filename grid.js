//PURPOSE: create random grid position, new x & y value within our grid --- reference to food.js random food position


const GRID_SIZE = 21
export function randomGridPosition() {
  return {
    //+1 allows us to get a number within 21 (math.floor only captures 20x20 grid)
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1
  }
}

//need this to end the game if the snake head goes outside the grid
export function outsideGrid(position) {
  return (
    position.x < 1 || position.x > GRID_SIZE ||
    position.y < 1 || position.y > GRID_SIZE 
  )
}