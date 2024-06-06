import { JSX, useEffect, useRef, useState } from 'react'
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
import { useStopwatch } from 'react-timer-hook'
import { useRecorder } from '@renderer/hooks/use-recorder'

interface SourceDevice {
  id: string
  label: string
}

const NULL_SOURCE_ID = 'null'

const shortenLabel = (label: string, length: number = 12) =>
  label.length > length ? label.substring(0, length) + '...' : label

export default function Recording(): JSX.Element {
  const videoRef = useRef(null)
  const [recording, setRecording] = useState(false)
  const [audioSources, setAudioSources] = useState<SourceDevice[]>([])
  const [cameraSources, setCameraSources] = useState<SourceDevice[]>([])
  const [desktopSources, setDesktopSources] = useState<SourceDevice[]>([])
  const [selectedAudioSource, setSelectedAudioSource] = useState<string>(NULL_SOURCE_ID)
  const [selectedCameraSource, setSelectedCameraSource] = useState<string>(NULL_SOURCE_ID)
  const [selectedDesktopSource, setSelectedDesktopSource] = useState<string>(NULL_SOURCE_ID)
  const chronometer = useStopwatch({ autoStart: false })

  const cameraRecorder = useRecorder()
  const audioRecorder = useRecorder()
  const desktopRecorder = useRecorder()

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

        setSelectedAudioSource(audioSources[0].id)
        setSelectedCameraSource(cameraSources[0].id)
      })
      .catch((err) => console.error(`${err.name}: ${err.message}`))

    window.recording.getDesktopSources().then((s) => {
      setDesktopSources([{ id: NULL_SOURCE_ID, label: 'Off' }, ...s])
      setSelectedDesktopSource(s[0].id)
    })
  }

  function startRecording() {
    setRecording(true)
    chronometer.start()

    return Promise.all([
      audioRecorder.startRecording(
        {
          video: false,
          audio: { deviceId: selectedAudioSource }
        },
        { type: 'audio' }
      ),
      cameraRecorder.startRecording(
        {
          video: { deviceId: selectedCameraSource },
          audio: false
        },
        { type: 'video' }
      ),
      desktopRecorder.startRecording(
        {
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: selectedDesktopSource
            }
          },
          audio: false
        },
        { type: 'video' }
      )
    ])
  }

  async function stopRecording() {
    setRecording(false)
    chronometer.reset(undefined, false)

    await Promise.all([
      audioRecorder
        .stopRecording()
        .then((buff) => buff && window.recording.saveAudio(Buffer.from(buff))),
      cameraRecorder
        .stopRecording()
        .then((buff) => buff && window.recording.saveCameraVideo(Buffer.from(buff))),
      desktopRecorder
        .stopRecording()
        .then((buff) => buff && window.recording.saveScreenVideo(Buffer.from(buff)))
    ])
  }

  // load camera preview
  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: selectedCameraSource }
        })

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(videoRef.current as any).srcObject = stream
      } catch (error) {
        console.error('Error accessing the camera:', error)
      }
    }

    if (videoRef.current && selectedCameraSource !== NULL_SOURCE_ID) {
      getUserMedia()
    }
  }, [videoRef, selectedCameraSource])

  // fetch available sources
  useEffect(() => {
    getAvailableSources()
  }, [])

  useEffect(() => {
    if (selectedCameraSource === NULL_SOURCE_ID) {
      window.context.resizeWindow(300, 170)
    } else {
      window.context.resizeWindow(300, 470)
    }
  }, [selectedCameraSource])

  return (
    <body className="h-screen bg-slate-950">
      <div className="flex flex-col h-full">
        <header className="h-8  top-0 left-0 w-screen"></header>

        {/* Camera showcase */}
        <div className={`m-1 flex-grow relative`}>
          <video
            ref={videoRef}
            autoPlay
            className={`${selectedCameraSource === NULL_SOURCE_ID ? 'hidden' : ''} h-full rounded-md w-full object-cover`}
          ></video>

          {/* Controls */}
          <div
            className={`pl-16 absolute bottom-0 left-0 right-0 flex  items-center justify-center py-4 space-x-4`}
          >
            {/* Recording circle */}
            <div className="h-10 w-10 border-2 bg-transparent border-white rounded-full flex justify-center items-center">
              {recording ? (
                <button
                  onClick={() => stopRecording()}
                  className="h-5 w-5 rounded-md bg-red-500 hover:bg-red-600"
                ></button>
              ) : (
                <button
                  onClick={() => startRecording()}
                  className="h-7 w-7 rounded-full bg-red-500"
                ></button>
              )}
            </div>

            <div className="bg-gray-800/50 px-3 py-0.5 rounded-full">
              <p className="text-xs text-white">
                {String(chronometer.minutes).padStart(2, '0')}:
                {String(chronometer.seconds).padStart(2, '0')}
              </p>
            </div>
          </div>
        </div>

        {/* Settings and commands */}
        <div className="flex px-1 mb-1 h-14 text-white">
          {recording ? (
            <>
              {/* Cancel */}
              <button className="h-14 w-full relative hover:bg-gray-100 rounded-md">
                <div className="h-full space-y-1 flex flex-col items-center justify-center">
                  <Trash2 className="h-5 w-5" />
                  <p className="text-xs">Cancel</p>
                </div>
              </button>

              {/* Restart */}
              <button className="h-14 w-full relative hover:bg-slate-800 rounded-md">
                <div className="h-full space-y-1 flex flex-col items-center justify-center">
                  <RotateCcw className="h-5 w-5" />
                  <p className="text-xs">Restart</p>
                </div>
              </button>
            </>
          ) : (
            <>
              {/* Audio sources */}
              <div className=" w-full relative">
                <div className="h-full space-y-1 flex flex-col items-center justify-center">
                  {selectedAudioSource === NULL_SOURCE_ID ? <MicOff /> : <Mic />}
                  <p className="text-xs">
                    {shortenLabel(
                      audioSources.find((s) => s.id === selectedAudioSource)?.label ?? '-'
                    )}
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
            </>
          )}
        </div>
      </div>
    </body>
  )
}
