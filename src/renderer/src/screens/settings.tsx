import { JSX, LegacyRef, useEffect, useRef, useState } from 'react'
import { RecordRTCPromisesHandler } from 'recordrtc'
import { Buffer } from 'buffer'
import {
  Camera,
  CameraOff,
  Mic,
  MicOff,
  Monitor,
  MonitorOff,
  RotateCcw,
  Trash2
} from 'lucide-react'

interface SourceDevice {
  id: string
  label: string
}

const NULL_SOURCE_ID = 'null'

const shortenLabel = (label: string, length: number = 12) =>
  label.length > length ? label.substring(0, length) + '...' : label

export default function Settings(): JSX.Element {
  const videoRef = useRef(null)
  const [recording, setRecording] = useState(false)
  const [audioSources, setAudioSources] = useState<SourceDevice[]>([])
  const [cameraSources, setCameraSources] = useState<SourceDevice[]>([])
  const [desktopSources, setDesktopSources] = useState<SourceDevice[]>([])
  const [selectedAudioSource, setSelectedAudioSource] = useState<string>(NULL_SOURCE_ID)
  const [selectedCameraSource, setSelectedCameraSource] = useState<string>(NULL_SOURCE_ID)
  const [selectedDesktopSource, setSelectedDesktopSource] = useState<string>(NULL_SOURCE_ID)

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

        setAudioSources([{ id: NULL_SOURCE_ID, label: 'Off' }, ...audioSources])
        setCameraSources([{ id: NULL_SOURCE_ID, label: 'Off' }, ...cameraSources])
      })
      .catch((err) => console.error(`${err.name}: ${err.message}`))

    window.recording
      .getDesktopSources()
      .then((s) => setDesktopSources([{ id: NULL_SOURCE_ID, label: 'Off' }, ...s]))
  }

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
      mimeType: 'audio/webm'
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

  // load camera preview
  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(videoRef.current as any).srcObject = stream
      } catch (error) {
        console.error('Error accessing the camera:', error)
      }
    }

    if (videoRef.current) getUserMedia()
  }, [videoRef])

  // fetch available sources
  useEffect(() => {
    getAvailableSources()
  }, [])

  return (
    <>
      <header className="h-8  top-0 left-0 w-screen"></header>

      {/* Camera showcase */}
      <div className="m-1 h-[360px] relative">
        {/* TODO: Handle camera off case */}
        <video ref={videoRef} autoPlay className="h-full rounded-md w-full object-cover"></video>
        {/* <div className="h-full rounded-md w-full bg-gray-950"></div> */}

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center py-4 space-y-3">
          <div className="bg-gray-800/50 px-3 py-0.5 rounded-full">
            <p className="text-xs text-white">1:00</p>
          </div>

          {/* Recording circle */}
          <div className="h-10 w-10 border-2 bg-transparent border-white rounded-full flex justify-center items-center">
            {recording ? (
              <button
                onClick={() => setRecording(false)}
                className="h-5 w-5 rounded-md bg-red-500"
              ></button>
            ) : (
              <button
                onClick={() => setRecording(true)}
                className="h-7 w-7 rounded-full bg-red-500"
              ></button>
            )}
          </div>
        </div>
      </div>

      {recording ? (
        // Cancel or restart
        <div className="flex">
          {/* Cancel */}
          <div className="h-14 w-full relative">
            <div className="h-full space-y-1 flex flex-col items-center justify-center">
              <Trash2 className="h-5 w-5" />
              <p className="text-xs">Cancel</p>
            </div>
          </div>

          {/* Restart */}
          <div className="h-14 w-full relative">
            <div className="h-full space-y-1 flex flex-col items-center justify-center">
              <RotateCcw className="h-5 w-5" />
              <p className="text-xs">Restart</p>
            </div>
          </div>
        </div>
      ) : (
        // settings
        <div className="flex px-1">
          {/* Audio sources */}
          <div className="h-14 w-full relative">
            <div className="h-full space-y-1 flex flex-col items-center justify-center">
              {selectedAudioSource === NULL_SOURCE_ID ? <MicOff /> : <Mic />}
              <p className="text-xs">
                {shortenLabel(audioSources.find((s) => s.id === selectedAudioSource)?.label ?? '-')}
              </p>
            </div>
            <select
              value={selectedAudioSource}
              onChange={(e) => setSelectedAudioSource(e.target.value)}
              className="absolute rounded-md left-0 right-0 top-0 bottom-0 appearance-none bg-transparent h-full w-full text-xs text-transparent"
            >
              {audioSources.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop sources */}
          <div className="h-14 w-full relative">
            <div className="h-full space-y-1 flex flex-col items-center justify-center">
              {selectedDesktopSource === NULL_SOURCE_ID ? <MonitorOff /> : <Monitor />}
              <p className="text-xs">
                {shortenLabel(
                  desktopSources.find((s) => s.id === selectedDesktopSource)?.label ?? '-'
                )}
              </p>
            </div>
            <select
              id="select-desktop-source"
              value={selectedDesktopSource}
              onChange={(e) => setSelectedDesktopSource(e.target.value)}
              className="absolute rounded-md left-0 right-0 top-0 bottom-0 appearance-none bg-transparent h-full w-full text-xs text-transparent"
            >
              {desktopSources.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Camera */}
          <div className="h-14 w-full relative">
            <div className="h-full space-y-1 flex flex-col items-center justify-center">
              {selectedCameraSource === NULL_SOURCE_ID ? <CameraOff /> : <Camera />}
              <p className="text-xs">
                {shortenLabel(
                  cameraSources.find((s) => s.id === selectedCameraSource)?.label ?? '-'
                )}
              </p>
            </div>
            <select
              value={selectedCameraSource}
              onChange={(e) => setSelectedCameraSource(e.target.value)}
              className="absolute rounded-md left-0 right-0 top-0 bottom-0 appearance-none bg-transparent h-full w-full text-xs text-transparent"
            >
              {cameraSources.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </>
  )
}
