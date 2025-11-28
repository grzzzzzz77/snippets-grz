import { BrowserWindow } from 'electron'
import { createWindow } from './window'
let win: BrowserWindow | null = null
export const openConfigWindow = () => {
  if (!win) win = createWindow()
  win.on('closed', () => {
    win = null
  })
}
