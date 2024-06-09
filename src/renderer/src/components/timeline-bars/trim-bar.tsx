import { Redo, Scissors, Trash, Undo } from 'lucide-react'
import { Button } from '../ui/button'
import Draggable from 'react-draggable'
import { useAtom, useAtomValue } from 'jotai'
import { fpsAtom, pxsPerFrameAtom, totalFramesAtom } from '@renderer/store/config'
import { useState } from 'react'
import { ClipSpec, clipsAtom } from '@renderer/store/editing'
import { Timeline } from '../timeline/timeline'
import { timelineCurrentFrameAtom } from '@renderer/store/timeline'
import { TimelinePlayControls } from '../timeline/play-controls'

export function TrimBar() {
  const fps = useAtomValue(fpsAtom)
  const totalFrames = useAtomValue(totalFramesAtom)
  const pxsPerFrame = useAtomValue(pxsPerFrameAtom)
  const currentFrame = useAtomValue(timelineCurrentFrameAtom)

  const [clips, setClips] = useAtom(clipsAtom)
  const [selected, setSelected] = useState<number | null>(null)

  function onSplit() {
    const splitAt = currentFrame

    // Find clip to split
    const currentClip = clips.find((c) => splitAt > c.fromFrameNumber && splitAt < c.toFrameNumber)
    if (currentClip === undefined) {
      return window.alert('No clip to split')
    }

    // check if there's enough room for split
    if (splitAt < currentClip.fromFrameNumber + fps || splitAt > currentClip.toFrameNumber - fps) {
      return window.alert('Clips should have at least 1 second long')
    }

    // let's replace currentClip with it's split version
    const newClips: ClipSpec[] = [
      { fromFrameNumber: currentClip.fromFrameNumber, toFrameNumber: splitAt },
      { fromFrameNumber: splitAt + 1, toFrameNumber: currentClip.toFrameNumber }
    ]

    setClips(
      [
        ...clips.filter(
          (c) =>
            !(
              c.fromFrameNumber === currentClip.fromFrameNumber &&
              c.toFrameNumber === currentClip.toFrameNumber
            )
        ),
        ...newClips
      ].sort((a, b) => a.fromFrameNumber - b.fromFrameNumber)
    )
  }

  function onDelete() {
    if (selected === null || clips.length === 1) {
      return
    }

    const updatedZooms = [...clips]
    updatedZooms.splice(selected, 1)
    setClips(updatedZooms)
    setSelected(null)
  }

  return (
    <div className="px-6 pt-4 bg-card border-t space-y-2">
      <div className="w-full flex">
        <TimelinePlayControls className="w-1/3" />

        {/* split and delete clip */}
        <div className="w-1/3 space-x-2 flex justify-center">
          <Button onClick={onSplit} size={'sm'} variant={'secondary'} className="py-1 text-xs">
            <Scissors className="mr-2 h-3 w-3" /> Split
          </Button>
          <Button
            disabled={selected === null || clips.length === 1}
            onClick={onDelete}
            size={'sm'}
            variant={'ghost'}
            className="py-1 text-xs text-gray-300"
          >
            <Trash className="mr-2 h-3 w-3" /> Delete
          </Button>
        </div>

        <div className="w-1/3 flex justify-end space-x-4">
          {/* undo/redo zoom */}
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <Undo className="h-3 w-3 text-gray-300" />
            </Button>
            <Button variant="ghost" size="sm">
              <Redo className="h-3 w-3 text-gray-300" />
            </Button>
          </div>

          {/* discard / export */}
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" size="sm">
              Discard
            </Button>
            <Button size="sm">Export</Button>
          </div>
        </div>
      </div>

      <Timeline>
        <div
          style={{ width: totalFrames * pxsPerFrame }}
          className="relative rounded-md h-full flex border"
        >
          {clips.map((z, i) => (
            <div key={i} className="relative">
              <Draggable
                axis="x"
                bounds={{
                  right: (z.toFrameNumber - fps) * pxsPerFrame,
                  left: Math.max(clips[i - 1] ? clips[i - 1].toFrameNumber : 0) * pxsPerFrame
                }}
                position={{ x: z.fromFrameNumber * pxsPerFrame, y: 0 }}
                onDrag={(e, data) => {
                  const updated = [...clips]
                  updated[i].fromFrameNumber = Math.floor(data.x / pxsPerFrame)
                  setClips(updated)
                }}
              >
                <div className="w-3 h-[40px] top-0 left-0 z-20 bg-white rounded-sm cursor-pointer absolute"></div>
              </Draggable>
              <button
                onClick={() => setSelected(selected === i ? null : i)}
                className={`${selected === i ? 'bg-white/40' : 'hover:bg-muted/80'} border-2 border-white flex justify-center items-center rounded-md absolute h-10`}
                style={{
                  width: (z.toFrameNumber - z.fromFrameNumber) * pxsPerFrame,
                  left: z.fromFrameNumber * pxsPerFrame,
                  top: 0
                }}
              ></button>
              <Draggable
                axis="x"
                bounds={{
                  left: (z.fromFrameNumber + fps) * pxsPerFrame,
                  right:
                    Math.min(clips[i + 1] ? clips[i + 1].fromFrameNumber : totalFrames) *
                    pxsPerFrame
                }}
                position={{ x: z.toFrameNumber * pxsPerFrame, y: 0 }}
                onDrag={(e, data) => {
                  const updated = [...clips]
                  updated[i].toFrameNumber = Math.floor(data.x / pxsPerFrame)
                  setClips(updated)
                }}
              >
                <div className="w-3 h-[40px] top-0 right-0 z-20 bg-white rounded-sm cursor-pointer absolute"></div>
              </Draggable>
            </div>
          ))}
        </div>
      </Timeline>
    </div>
  )
}
