// PURPOSE: keyboard allows for inputs to dictate snake movement
// Default: the snake to be stationary
let inputDirection = { x: 0, y: 0 }
let lastInputDirection = { x: 0, y : 0 }
// so (-y) goes up and (+y) goes down

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      if (lastInputDirection.y !== 0) break 
      inputDirection = { x: 0, y: -1 } //recall: -1 moves us up
      break
    case 'ArrowDown':
      if (lastInputDirection.y !== 0) break 
      inputDirection = { x: 0, y: 1 } //recall: +1 moves us DOWN
      break
    case 'ArrowLeft':
      if (lastInputDirection.x !== 0) break 
      inputDirection = { x: -1, y: 0 } 
      break
    case 'ArrowRight':
      if (lastInputDirection.x !== 0) break 
      inputDirection = { x: 1, y: 0 }
      break
  }
})

//if last input was UP, then ignore down option. if prev move was right deny left movement
export function getInputDirection() {
  lastInputDirection = inputDirection
  return inputDirection
}