import {
  Crop,
  Image,
  LayoutTemplate,
  Play,
  Redo,
  Spline,
  Undo,
  ZoomIn
} from 'lucide-react'
import { Slider } from '@renderer/components/ui/slider'
import { Button } from '@renderer/components/ui/button'
import { ScrollArea } from '@renderer/components/ui/scroll-area'
import { useState } from 'react'

// Mock images
import bgImage from '@renderer/assets/images/bg.jpeg'
import mockFrame from '@renderer/assets/images/frame.png'
import Draggable from 'react-draggable'

export default function Editing() {
  return (
    <div className="h-screen bg-card">
      <div className="flex flex-col h-full">
        <header className="h-12 mb-2  top-0 left-0 w-screen border-b"></header>

        <div className="grid grid-cols-6 h-full gap-2 pb-2">
          {/* preview */}
          <div className="flex flex-col col-span-4 pl-2">
            <div className="flex  flex-grow items-start">
              <img className="object-contain rounded-md border" src={mockFrame} />
            </div>
          </div>

          {/* tools panel */}
          <div className="col-span-2 pr-2 flex space-x-2">
            {/* panel */}
            <div className="rounded-md bg-card w-full p-6 border">
              {/* <BackgroundPanel /> */}
              <ZoomPanel />
            </div>

            {/* menu panel */}
            <div className="flex-col w-10 space-y-4 bg-card border rounded-md">
              <button className="w-full p-2 hover:bg-accent rounded-md">
                <Image className="text-white" />
              </button>

              <button className="w-full p-2 hover:bg-accent rounded-md">
                <LayoutTemplate className="text-white" />
              </button>

              <button className="w-full p-2 hover:bg-accent rounded-md">
                <ZoomIn className="text-white" />
              </button>

              <button className="w-full p-2 hover:bg-accent rounded-md">
                <Spline className="text-white" />
              </button>

              <button className="w-full p-2 hover:bg-accent rounded-md">
                <Crop className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* <TrimBar /> */}
        {/* <PlayBar /> */}
        <ZoomBar />
      </div>
    </div>
  )
}

function TrimBar() {
  return (
    <div className="px-6 pt-4 pb-4 space-y-6  bg-card border-t">
      <div className="w-full">
        {/* play controls */}
        <div className="flex space-x-3 items-center">
          <button className="">
            <Play className="text-white h-4 w-4" />
          </button>
          <span className="text-white text-sm">01:22.20 / 01:12.00</span>
        </div>

        {/* export button */}
      </div>

      {/* <div className="w-full h-10 border rounded-md"></div> */}
    </div>
  )
}

function ZoomBar() {
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
            <ZoomIn className="mr-2 h-3 w-3" /> Remove zoom
          </Button>
        </div>

        {/* undo/redo zoom */}
        <div className="w-1/3 flex justify-end space-x-2">
          <Button variant="ghost" size="sm">
            <Undo className="h-3 w-3 text-gray-300" />
          </Button>
          <Button variant="ghost" size="sm">
            <Redo className="h-3 w-3 text-gray-300" />
          </Button>
        </div>
      </div>

      {/* <div className="w-full h-10 border rounded-md"></div> */}
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

function PlayBar() {
  return (
    <div className="px-6 pt-4 pb-4 bg-card flex space-x-4 border-t">
      {/* play controls */}
      <div className="flex space-x-3 items-center w-[250px]">
        <button className="">
          <Play className="text-white h-4 w-4" />
        </button>
        <span className="text-white text-sm">01:22.20 / 01:12.00</span>
      </div>

      {/* time slider */}
      <Slider />

      {/* control buttons */}
      <div className="flex space-x-2">
        <Button size={'sm'} variant={'destructive'}>
          Discard
        </Button>
        <Button size={'sm'}>Export</Button>
      </div>
    </div>
  )
}

function BackgroundPanel() {
  const backgrounds = [bgImage, bgImage, bgImage, bgImage]
  const [selected, setSelected] = useState(0)

  return (
    <div className="flex flex-col ">
      <h1 className="text-white font-medium text-sm">Background</h1>
      <ScrollArea className=" mt-4">
        <div className="grid grid-cols-2 gap-2 w-full">
          {backgrounds.map((b, i) => (
            <button key={i} onClick={() => setSelected(i)}>
              <img
                src={b}
                className={`${selected === i ? 'border-4 border-spacing-2 border-primary' : 'hover:border-2 border-white '} rounded-md`}
              />
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

function ZoomPanel() {
  return (
    <div className="flex flex-col ">
      <h1 className="text-white font-medium text-sm">Zoom</h1>
      <div className="mt-4 space-y-1">
        <label htmlFor="" className="text-slate-200 text-xs">
          Focus point
        </label>
        <div className="border flex justify-center rounded-md">
          <img className="object-contain rounded-md" src={mockFrame} alt="" />
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <label htmlFor="" className="text-slate-200 text-xs">
          Scale
        </label>
        <div className="flex items-center space-x-4">
          <span className="text-white text-sm">100%</span>
          <Slider />
        </div>
      </div>
    </div>
  )
}
