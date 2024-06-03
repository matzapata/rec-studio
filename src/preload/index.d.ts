import {
  RecordingGetDesktopSources,
  RecordingSaveAudio,
  RecordingSaveCameraVideo,
  RecordingSaveScreenVideo,
  ResizeWindow
} from '@shared/types'

declare global {
  interface Window {
    recording: {
      getDesktopSources: RecordingGetDesktopSources
      saveCameraVideo: RecordingSaveCameraVideo
      saveScreenVideo: RecordingSaveScreenVideo
      saveAudio: RecordingSaveAudio
    }
    context: {
      resizeWindow: ResizeWindow
    }
  }
}
