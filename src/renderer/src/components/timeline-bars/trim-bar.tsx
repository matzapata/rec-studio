import { Play, Redo, Scissors, Trash, Undo } from 'lucide-react'
import { Button } from '../ui/button'
import Draggable from 'react-draggable'

export function TrimBar() {
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
          <Button size={'sm'} variant={'secondary'} className="py-1 text-xs">
            <Scissors className="mr-2 h-3 w-3" /> Split
          </Button>
          <Button size={'sm'} variant={'ghost'} className="py-1 text-xs text-gray-300">
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
      <div className="py-8 ">
        <div className="relative h-[40px]">
          <Draggable axis="x" bounds="parent">
            <div className="w-1 h-12 z-20 bg-red-600 rounded-sm cursor-pointer absolute -top-1"></div>
          </Draggable>

          <div style={{ width: '100%' }} className="relative rounded-md h-full flex border"></div>
        </div>
      </div>
    </div>
  )
}
