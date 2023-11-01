import { ALIVE_COLOR, CELL_SIZE, DEAD_COLOR, GRID_COLOR } from './const.js'
import { canvas, ctx } from './elements.js'
import Universe from './universe.js'

const universe = new Universe()
const width = universe.width
const height = universe.height
canvas.width = (CELL_SIZE + 1) * width + 1
canvas.height = (CELL_SIZE + 1) * height + 1

const drawGrid = (): void => {
  ctx.beginPath()
  ctx.strokeStyle = GRID_COLOR

  for (let i = 0; i <= width; i++) {
    ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0)
    ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1)
  }

  // Horizontal lines.
  for (let j = 0; j <= height; j++) {
    ctx.moveTo(0, j * (CELL_SIZE + 1) + 1)
    ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1)
  }

  ctx.stroke()
}

const drawCells = (): void => {
  const cells = universe.cells
  ctx.beginPath()

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col)

      ctx.fillStyle = !cells[idx]
        ? DEAD_COLOR
        : ALIVE_COLOR

      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      )
    }
  }

  ctx.stroke()
}

const getIndex = (row: number, column: number): number => {
  return row * width + column
}

const renderLoop = (): void => {
  universe.tick()

  drawGrid()
  drawCells()

  requestAnimationFrame(renderLoop)
}

renderLoop()
