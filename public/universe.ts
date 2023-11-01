export default class Universe {
  width: number
  height: number
  cells: boolean[]

  constructor () {
    this.width = 100
    this.height = 100
    const cells = new Array(this.width * this.height).fill(false).map((_, idx) => {
      if (idx % 2 === 0 || idx % 7 === 0) {
        return true
      } else {
        return false
      }
    })
    this.cells = cells
  }

  tick (): void {
    const next = new Array(this.width * this.height)

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        const idx = this.getIndex(row, col)
        const cell = this.cells[idx]
        const liveNeighbors = this.liveNeighborCount(row, col)

        let nextCell
        if (cell && liveNeighbors < 2) {
          nextCell = false
        } else if (cell && (liveNeighbors === 2 || liveNeighbors === 3)) {
          nextCell = true
        } else if (cell && liveNeighbors > 3) {
          nextCell = false
        } else if (!cell && liveNeighbors === 3) {
          nextCell = true
        } else {
          nextCell = cell
        }

        next[idx] = nextCell
      }
    }

    this.cells = next
  }

  getIndex (row: number, column: number): number {
    return row * this.width + column
  }

  liveNeighborCount (row: number, column: number): number {
    let count = 0
    for (const deltaRow of [this.height - 1, 0, 1]) {
      for (const deltaCol of [this.width - 1, 0, 1]) {
        if (deltaRow === 0 && deltaCol === 0) {
          continue
        }

        const neighborRow = (row + deltaRow) % this.height
        const neighborCol = (column + deltaCol) % this.width
        const idx = this.getIndex(neighborRow, neighborCol)
        if (this.cells[idx]) count++
      }
    }
    return count
  }
}
