import { Play, Redo, Trash, Undo, ZoomIn } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import Draggable from 'react-draggable'

export function ZoomBar() {
  const barWidth = 1000
  const [position, setPosition] = useState(0)
  const [zooms, setZooms] = useState([{ from: 50, to: 500, zoom: 200 }])
  const [selected, setSelected] = useState<number | null>(null)

  const handleDrag = (e, data) => {
    setPosition(data.x)
  }

  function addZoom() {
    // const z = zooms.filter(z => z.zoom > 0)
    console.log('position', position)
    setZooms(
      [...zooms, { from: position, to: position + 100, zoom: 200 }].sort((a, b) => a.from - b.from)
    )
  }

  return (
    <div className="px-6 pt-4 bg-card border-t">
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
          <Button onClick={addZoom} size={'sm'} variant={'secondary'} className="py-1 text-xs">
            <ZoomIn className="mr-2 h-3 w-3" /> Add zoom
          </Button>
          <Button size={'sm'} variant={'ghost'} className="py-1 text-xs text-gray-300">
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

      <div className="py-8 ">
        <div className="relative h-[40px]">
          <Draggable axis="x" bounds="parent" onDrag={handleDrag}>
            <div className="w-1 h-12 z-20 bg-red-600 rounded-sm cursor-pointer absolute -top-1"></div>
          </Draggable>

          <div style={{ width: barWidth }} className="relative rounded-md h-full flex">
            {zooms.map((z, i) => (
              <div key={i}>
                <Draggable
                  axis="x"
                  bounds={{ right: z.to - 50, left: Math.max(zooms[i - 1] ? zooms[i - 1].to : 0) }}
                  defaultPosition={{ x: z.from, y: 0 }}
                  onDrag={(e, data) => {
                    const updated = [...zooms]
                    updated[i].from = data.x
                    setZooms(updated)
                  }}
                >
                  <div className="w-2 h-[20px] top-[10px] -left-1 z-20 bg-red-500 rounded-sm cursor-pointer absolute"></div>
                </Draggable>
                <button
                  onClick={() => setSelected(i)}
                  className={`${selected === i ? 'border-white' : ''} border-2 hover:border-white flex justify-center items-center rounded-md absolute h-10`}
                  style={{ width: z.to - z.from, left: z.from, top: 0 }}
                ></button>
                <Draggable
                  axis="x"
                  bounds={{
                    left: z.from + 50,
                    right: Math.min(zooms[i + 1] ? zooms[i + 1].from : barWidth)
                  }}
                  defaultPosition={{ x: z.to, y: 0 }}
                  onDrag={(e, data) => {
                    const updated = [...zooms]
                    updated[i].to = data.x
                    setZooms(updated)
                  }}
                >
                  <div className="w-2 h-[20px] top-[10px] -left-1 z-20 bg-red-500 rounded-sm cursor-pointer absolute"></div>
                </Draggable>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}