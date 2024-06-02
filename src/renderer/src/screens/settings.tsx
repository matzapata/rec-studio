import { JSX, useEffect, useState } from 'react'
import { RecordRTCPromisesHandler } from 'recordrtc'
import { Buffer } from 'buffer'

interface SourceDevice {
  id: string
  label: string
}

const NullSource: SourceDevice = {
  id: "null",
  label: "Don't use"
}

export default function Settings(): JSX.Element {
  const [audioSources, setAudioSources] = useState<SourceDevice[]>([])
  const [cameraSources, setCameraSources] = useState<SourceDevice[]>([])
  const [desktopSources, setDesktopSources] = useState<SourceDevice[]>([])
  const [selectedAudioSource, setSelectedAudioSource] = useState<string>(NullSource.id)
  const [selectedCameraSource, setSelectedCameraSource] = useState<string>(NullSource.id)
  const [selectedDesktopSource, setSelectedDesktopSource] = useState<string>(NullSource.id)

  function getAvailableSources() {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const audioSources: SourceDevice[] = []
        const cameraSources: SourceDevice[] = []

        devices.forEach((device) => {
          if (device.kind === 'audioinput') {
            audioSources.push({ id: device.deviceId, label: device.label })
          } else if (device.kind === 'videoinput') {
            cameraSources.push({ id: device.deviceId, label: device.label })
          }
        })

        setAudioSources(audioSources)
        setCameraSources(cameraSources)
      })
      .catch((err) => console.error(`${err.name}: ${err.message}`))

    window.recording.getDesktopSources().then((s) => setDesktopSources([...s]))
  }

  useEffect(() => {
    getAvailableSources()
  }, [])

  const startCameraVideo = async (cameraId: string) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: cameraId },
      audio: false
    })
    const recorder = new RecordRTCPromisesHandler(stream, {
      type: 'video'
    })
    recorder.startRecording()

    const sleep = (m) => new Promise((r) => setTimeout(r, m))
    await sleep(3000)

    await recorder.stopRecording()
    const blob: Blob = await recorder.getBlob()
    console.log('blob', blob)
    window.recording
      .saveCameraVideo(Buffer.from(await blob.arrayBuffer()))
      .then(() => console.log('OK'))
      .catch(console.log)
    // invokeSaveAsDialog(blob);
  }

  const startScreenVideo = async (desktopId: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stream = await (navigator.mediaDevices as any).getUserMedia({
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: desktopId
        }
      },
      audio: false
    })
    const recorder = new RecordRTCPromisesHandler(stream, {
      type: 'video'
    })
    recorder.startRecording()

    const sleep = (m) => new Promise((r) => setTimeout(r, m))
    await sleep(3000)

    await recorder.stopRecording()
    const blob: Blob = await recorder.getBlob()
    console.log('blob', blob)
    window.recording
      .saveScreenVideo(Buffer.from(await blob.arrayBuffer()))
      .then(() => console.log('OK'))
      .catch(console.log)
  }

  const startAudioVideo = async (audioId: string) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: { deviceId: audioId }
    })
    const recorder = new RecordRTCPromisesHandler(stream, {
      type: 'audio',
      mimeType: "audio/webm"
    })
    recorder.startRecording()

    const sleep = (m) => new Promise((r) => setTimeout(r, m))
    await sleep(3000)

    await recorder.stopRecording()
    const blob: Blob = await recorder.getBlob()
    console.log('blob', blob)
    window.recording
      .saveAudio(Buffer.from(await blob.arrayBuffer()))
      .then(() => console.log('OK'))
      .catch(console.log)
    // invokeSaveAsDialog(blob);
  }

  function onRecord() {
    startCameraVideo(selectedCameraSource)
    startScreenVideo(selectedDesktopSource)
    startAudioVideo(selectedAudioSource)
  }

  return (
    <>
      <header className="bg-white h-20 bg-transparent flex items-end pb-3 px-4 border-b">
        <h1 className="font-medium text-slate-700">New recording</h1>
      </header>
      <div className="h-full py-4 px-4 space-y-2">
        <div>
          <label className="block mb-2 text-xs font-medium text-slate-700">Desktop source</label>
          <select
            value={selectedDesktopSource}
            onChange={(e) => setSelectedDesktopSource(e.target.value)}
            className="appearance-none custom-select-icon bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value={NullSource.id}>Don&apos;t record the screen</option>
            {desktopSources.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-xs font-medium text-slate-700">Camera</label>
          <select
            value={selectedCameraSource}
            onChange={(e) => setSelectedCameraSource(e.target.value)}
            className="appearance-none custom-select-icon bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value={NullSource.id}>Don&apos;t record the camera</option>
            {cameraSources.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-xs font-medium text-slate-700">Audio</label>
          <select
            value={selectedAudioSource}
            onChange={(e) => setSelectedAudioSource(e.target.value)}
            className="appearance-none custom-select-icon bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value={NullSource.id}>Don&apos;t record audio</option>
            {audioSources.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="py-4">
          <button onClick={onRecord} className="text-center py-3 w-full bg-[#5538F5] text-sm text-white rounded-md">
            Start recording
          </button>
        </div>
      </div>
    </>
  )
}
