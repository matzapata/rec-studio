import { contextBridge } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    // TODO: add methods here to expose to renderer
    // getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),
  })
} catch (error) {
  console.error(error)
}
