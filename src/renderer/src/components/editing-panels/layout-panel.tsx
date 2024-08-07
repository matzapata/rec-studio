import { ScrollArea } from '../ui/scroll-area'
import { useAtom } from 'jotai'
import { Layouts, layoutAtom } from '@renderer/store/editing'



export function LayoutPanel() {
  const [layout, setLayout] = useAtom(layoutAtom)

  return (
    <div className="flex flex-col ">
      <h1 className="text-white font-medium text-sm">Layouts</h1>
      <ScrollArea className=" mt-4">
        <p className="text-gray-300 text-xs mb-2">Horizontal</p>
        <div className="grid grid-cols-2 gap-2 w-full">
          {/* Screen only */}
          <button onClick={() => setLayout(Layouts.SCREEN_ONLY)}>
            <div
              className={`${layout === Layouts.SCREEN_ONLY ? 'border-white' : ''} hover:border-white hover:bg-muted h-[100px] border-2 rounded-lg flex items-center justify-center bg-muted/90`}
            ></div>
          </button>
          {/* Screen background */}
          <button onClick={() => setLayout(Layouts.SCREEN_BACKGROUND)}>
            <div
              className={`${layout === Layouts.SCREEN_BACKGROUND ? 'border-white' : ''} hover:border-white hover:bg-muted/50 bg-muted/30 h-[100px] border-2 rounded-lg flex items-center justify-center`}
            >
              <div className="h-[80px] w-[80%] rounded-md border-2 bg-muted"></div>
            </div>
          </button>
          {/* Screen camera right */}
          <button onClick={() => setLayout(Layouts.SCREEN_CAMERA_RIGHT)}>
            <div
              className={`${layout === Layouts.SCREEN_CAMERA_RIGHT ? 'border-white' : ''} hover:border-white hover:bg-muted/50 bg-muted/30 h-[100px] border-2 rounded-md flex items-center justify-evenly`}
            >
              <div className="h-[80px] w-[60%] rounded-md border-2 bg-muted"></div>
              <div className="h-[60px] w-[20%] rounded-md border-2 bg-muted"></div>
            </div>
          </button>
          <button onClick={() => setLayout(Layouts.SCREEN_CAMERA_LEFT)}>
            <div
              className={`${layout === Layouts.SCREEN_CAMERA_LEFT ? 'border-white' : ''} hover:border-white hover:bg-muted/50 bg-muted/30 h-[100px] border-2 rounded-md flex items-center justify-evenly`}
            >
              <div className="h-[60px] w-[20%] rounded-md border-2 bg-muted"></div>
              <div className="h-[80px] w-[60%] rounded-md border-2 bg-muted"></div>
            </div>
          </button>
        </div>
        {/* TODO: Vertical layouts */}
        {/* <p className="text-gray-300 text-xs mb-2 mt-4">Vertical</p>
        <div className="grid grid-cols-2 gap-2 w-full">
          {backgrounds.map((b, i) => (
            <button key={i} onClick={() => setSelected(i)}>
              <img
                src={b}
                className={`${selected === i ? 'border-4 border-spacing-2 border-primary' : 'hover:border-2 border-white '} rounded-md`}
              />
            </button>
          ))}
        </div> */}
      </ScrollArea>
    </div>
  )
}
