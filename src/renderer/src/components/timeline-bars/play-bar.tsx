import { Play } from 'lucide-react'
import { Button } from '../ui/button'
import Draggable from 'react-draggable'

export function PlayBar() {
  return (
    <div className="px-6 pt-4 bg-card border-t space-y-2">
      <div className="w-full flex justify-between">
        {/* play controls */}
        <div className="flex space-x-3 items-center">
          <button className="">
            <Play className="text-white h-4 w-4" />
          </button>
          <span className="text-white text-sm">01:22.20 / 01:12.00</span>
        </div>

        {/* discard / export */}
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" size="sm">
            Discard
          </Button>
          <Button size="sm">Export</Button>
        </div>
      </div>

      <div className="py-8 ">
        <div className="relative h-[40px]">
          <Draggable axis="x" bounds="parent">
            <div className="w-1 h-14 z-30 bg-red-600 rounded-sm cursor-pointer absolute -top-2"></div>
          </Draggable>

          <div style={{ width: '100%' }} className="relative rounded-md h-full flex border"></div>
        </div>
      </div>
    </div>
  )
}
