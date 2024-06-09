import { Play, Redo, Trash, Undo, ZoomIn } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import Draggable from 'react-draggable'
import { useAtom, useAtomValue } from 'jotai'
import { selectedZoomAtom, zoomsAtom } from '@renderer/store/editing'
import { fpsAtom, pxsPerFrameAtom, totalFramesAtom } from '@renderer/store/config'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

export function ZoomBar() {
  const fps = useAtomValue(fpsAtom)
  const totalFrames = useAtomValue(totalFramesAtom)
  const pxsPerFrame = useAtomValue(pxsPerFrameAtom)

  const [position, setPosition] = useState(0)
  const [zooms, setZooms] = useAtom(zoomsAtom)
  const [selected, setSelected] = useAtom(selectedZoomAtom)

  const handleDrag = (e, data) => {
    setPosition(data.x)
  }

  function onAddZoom() {
    const frameNumber = position / pxsPerFrame

    // check if there's enough room for zoom
    if (
      zooms.find((z) => frameNumber >= z.fromFrameNumber && frameNumber <= z.toFrameNumber) ||
      frameNumber + fps > totalFrames
    ) {
      return window.alert("There's not enough space, at least 1 sec is required for a zoom")
    }

    setZooms(
      [
        ...zooms,
        { fromFrameNumber: frameNumber, toFrameNumber: frameNumber + fps, scale: 200 }
      ].sort((a, b) => a.fromFrameNumber - b.fromFrameNumber)
    )

    console.log(
      'zooms',
      [
        ...zooms,
        { fromFrameNumber: frameNumber, toFrameNumber: frameNumber + fps, scale: 200 }
      ].sort((a, b) => a.fromFrameNumber - b.fromFrameNumber)
    )
  }

  function onDelete() {
    if (selected === null) {
      return
    }

    const updatedZooms = [...zooms]
    updatedZooms.splice(selected, 1)
    setZooms(updatedZooms)
    setSelected(null)
  }

  return (
    <div className="px-6 pt-4 bg-card border-t space-y-2">
      <div className="w-full flex">
        {/* play controls */}
        <div className="flex space-x-3 items-center w-1/3">
          <button className="">
            <Play className="text-white h-4 w-4" />
          </button>
          <span className="text-white text-sm">01:22.20 / 01:12.00</span>
        </div>

        {/* add/delete zoom */}
        <div className="w-1/3 space-x-2 flex justify-center">
          <Button onClick={onAddZoom} size={'sm'} variant={'secondary'} className="py-1 text-xs">
            <ZoomIn className="mr-2 h-3 w-3" /> Add zoom
          </Button>
          <Button
            disabled={selected === null}
            onClick={onDelete}
            size={'sm'}
            variant={'ghost'}
            className="py-1 text-xs text-gray-300"
          >
            <Trash className="mr-2 h-3 w-3" /> Remove zoom
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

      <ScrollArea>
        <div className="py-8 ">
          <div className="relative h-[40px]">
            <Draggable axis="x" bounds="parent" onDrag={handleDrag}>
              <div className="w-1 h-14 z-30 bg-red-600 rounded-sm cursor-pointer absolute -top-2"></div>
            </Draggable>

            <div
              style={{ width: totalFrames * pxsPerFrame }}
              className="relative rounded-md h-full flex border"
            >
              {zooms.map((z, i) => (
                <div key={i} className="relative">
                  <Draggable
                    axis="x"
                    bounds={{
                      left: Math.max(zooms[i - 1] ? zooms[i - 1].toFrameNumber : 0) * pxsPerFrame,
                      right: (z.toFrameNumber - fps) * pxsPerFrame
                    }}
                    position={{ x: z.fromFrameNumber * pxsPerFrame, y: 0 }}
                    onDrag={(e, data) => {
                      const updated = [...zooms]
                      updated[i].fromFrameNumber = Math.floor(data.x / pxsPerFrame)
                      setZooms(updated)
                    }}
                  >
                    <div className="w-3 h-[40px] z-20 bg-white rounded-sm cursor-pointer absolute"></div>
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
                        Math.min(zooms[i + 1] ? zooms[i + 1].fromFrameNumber : totalFrames) *
                        pxsPerFrame
                    }}
                    position={{ x: z.toFrameNumber * pxsPerFrame, y: 0 }}
                    onDrag={(e, data) => {
                      const updated = [...zooms]
                      updated[i].toFrameNumber = Math.floor(data.x / pxsPerFrame)
                      setZooms(updated)
                    }}
                  >
                    <div className="w-3 h-[40px] z-20 bg-white rounded-sm cursor-pointer absolute right-0"></div>
                  </Draggable>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
