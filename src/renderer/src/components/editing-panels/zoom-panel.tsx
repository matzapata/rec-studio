import mockFrame from '@renderer/assets/images/frame.png'
import { Slider } from '../ui/slider'

export function ZoomPanel() {
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
