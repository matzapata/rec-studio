import {
  RecordingGetDesktopSources,
  RecordingSaveAudio,
  RecordingSaveCameraVideo,
  RecordingSaveScreenVideo,
  ResizeWindow
} from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('recording', {
    getDesktopSources: (...args: Parameters<RecordingGetDesktopSources>) =>
      ipcRenderer.invoke('RecordingGetSources', ...args),
    saveCameraVideo: (...args: Parameters<RecordingSaveCameraVideo>) =>
      ipcRenderer.invoke('RecordingSaveCameraVideo', ...args),
    saveScreenVideo: (...args: Parameters<RecordingSaveScreenVideo>) =>
      ipcRenderer.invoke('RecordingSaveScreenVideo', ...args),
    saveAudio: (...args: Parameters<RecordingSaveAudio>) =>
      ipcRenderer.invoke('RecordingSaveAudio', ...args)
  })
  contextBridge.exposeInMainWorld('context', {
    resizeWindow: (...args: Parameters<ResizeWindow>) => ipcRenderer.invoke('ResizeWindow', ...args)
  })
} catch (error) {
  console.error(error)
}
