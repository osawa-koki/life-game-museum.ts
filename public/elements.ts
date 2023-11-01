/* eslint-disable @typescript-eslint/no-non-null-assertion */

export const canvas = document.getElementById('canvas')! as HTMLCanvasElement
export const ctx = canvas.getContext('2d')!

export const generationCountElement = document.getElementById('generation-count')! as HTMLSpanElement

export const cellSizeInput = document.getElementById('cell-size')! as HTMLInputElement
export const gridColorInput = document.getElementById('grid-color')! as HTMLInputElement
export const aliveColorInput = document.getElementById('alive-color')! as HTMLInputElement
export const deadColorInput = document.getElementById('dead-color')! as HTMLInputElement

export const playPauseButton = document.getElementById('play-pause')! as HTMLButtonElement

/* eslint-enable @typescript-eslint/no-non-null-assertion */
