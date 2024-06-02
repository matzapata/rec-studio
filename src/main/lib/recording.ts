import {
  RecordingGetDesktopSources,
  RecordingSaveCameraVideo,
  RecordingSaveScreenVideo
} from '@shared/types'
import { desktopCapturer } from 'electron/main'
import { writeFile } from 'fs/promises'
import path from 'path'

export const getDesktopSources: RecordingGetDesktopSources = async () => {
  const sources = await desktopCapturer.getSources({
    types: ['window', 'screen']
  })
  return sources.map((s) => ({ id: s.id, label: s.name }))
}

export const saveCameraVideo: RecordingSaveCameraVideo = async (buff: Buffer) => {
  return writeFile(path.join('/Users/matias/git/rec-studio/src/main/lib', 'camera.webm'), buff)
}

export const saveScreenVideo: RecordingSaveScreenVideo = async (buff: Buffer) => {
  return writeFile(path.join('/Users/matias/git/rec-studio/src/main/lib', 'screen.webm'), buff)
}

export const saveAudio: RecordingSaveScreenVideo = async (buff: Buffer) => {
  return writeFile(path.join('/Users/matias/git/rec-studio/src/main/lib', 'audio.webm'), buff)
}
