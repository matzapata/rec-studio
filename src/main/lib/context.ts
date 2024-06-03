import { ResizeWindow } from '@shared/types'
import { BrowserWindow } from 'electron'

export const resizeWindow: ResizeWindow = async (width: number, height: number) => {
  const windows = BrowserWindow.getAllWindows()
  windows[0].setSize(width, height) // TODO: ensure window name
}
