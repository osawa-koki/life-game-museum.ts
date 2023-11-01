import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import './initializer'

import { aliveColorInput, canvas, cellSizeInput, ctx, deadColorInput, generationCountElement, gridColorInput, playPauseButton } from './elements'
import Universe from './universe'

const universe = new Universe()
const width = universe.width
const height = universe.height

function setCanvasSize (): void {
  canvas.width = (cellSizeInput.valueAsNumber + 1) * width + 1
  canvas.height = (cellSizeInput.valueAsNumber + 1) * height + 1
}
setCanvasSize()
cellSizeInput.addEventListener('change', setCanvasSize)

const drawGrid = (): void => {
  const cellSize = cellSizeInput.valueAsNumber
  const gridColor = gridColorInput.value

  ctx.beginPath()
  ctx.strokeStyle = gridColor

  for (let i = 0; i <= width; i++) {
    ctx.moveTo(i * (cellSize + 1) + 1, 0)
    ctx.lineTo(i * (cellSize + 1) + 1, (cellSize + 1) * height + 1)
  }

  // Horizontal lines.
  for (let j = 0; j <= height; j++) {
    ctx.moveTo(0, j * (cellSize + 1) + 1)
    ctx.lineTo((cellSize + 1) * width + 1, j * (cellSize + 1) + 1)
  }

  ctx.stroke()
}

const drawCells = (): void => {
  const cellSize = cellSizeInput.valueAsNumber
  const aliveColor = aliveColorInput.value
  const deadColor = deadColorInput.value

  const cells = universe.cells
  ctx.beginPath()

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col)

      ctx.fillStyle = cells[idx]
        ? aliveColor
        : deadColor

      ctx.fillRect(
        col * (cellSize + 1) + 1,
        row * (cellSize + 1) + 1,
        cellSize,
        cellSize
      )
    }
  }

  ctx.stroke()
}

const getIndex = (row: number, column: number): number => {
  return row * width + column
}

let animationId: number | null = null
let generationCount = 0
const renderLoop = (): void => {
  universe.tick()

  generationCount++
  setGenerationCount()

  drawGrid()
  drawCells()

  animationId = requestAnimationFrame(renderLoop)
}

function setGenerationCount (): void {
  generationCountElement.textContent = generationCount.toString()
}
setGenerationCount()

const play = (): void => {
  playPauseButton.textContent = 'Pause'
  renderLoop()
}

const pause = (): void => {
  if (animationId === null) return
  playPauseButton.textContent = 'Play'
  cancelAnimationFrame(animationId)
  animationId = null
}

const isPaused = (): boolean => {
  return animationId === null
}

playPauseButton.addEventListener('click', () => {
  if (isPaused()) {
    play()
  } else {
    pause()
  }
})

drawGrid()
drawCells()

play()
