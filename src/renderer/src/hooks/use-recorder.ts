import { useState } from 'react'
import { RecordRTCPromisesHandler } from 'recordrtc'

export function useRecorder() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recorder, setRecorder] = useState<any | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const startRecording = async (constraints: any, rtcOpts: any) => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    const recorder = new RecordRTCPromisesHandler(stream, rtcOpts)
    recorder.startRecording()
    setRecorder(recorder)
  }

  const stopRecording = async () => {
    if (!recorder) return

    await recorder.stopRecording()
    const blob: Blob = await recorder.getBlob()
    return await blob.arrayBuffer()
  }

  return {
    startRecording,
    stopRecording
  }
}
