
import { useAtom } from 'jotai'
import { ScrollArea } from '../ui/scroll-area'
import { BorderShape, borderAtom } from '@renderer/store/editing'


export function BorderPanel() {
  const [border, setBorder] = useAtom(borderAtom)

  return (
    <div className="flex flex-col ">
      <h1 className="text-white font-medium text-sm">Border</h1>
      <ScrollArea className=" mt-4">
        <p className="text-gray-300 text-xs mb-2">Shape</p>
        <div className="grid grid-cols-2 gap-2 w-full">
          {/* Rounded */}
          <button onClick={() => setBorder(BorderShape.ROUNDED)}>
            <div
              className={`${border === BorderShape.ROUNDED ? 'border-white bg-muted/50' : 'border-gray-400'} hover:border-white hover:bg-muted/50 bg-muted/30 h-[100px] border-2 rounded-lg flex items-end justify-start`}
            >
              <div className="h-[60%] w-[70%] rounded-tr-xl rounded-bl-md border-t-2 border-r-2 border-gray-400 bg-muted"></div>
            </div>
          </button>
          {/* Rectangular */}
          <button onClick={() => setBorder(BorderShape.RECTANGULAR)}>
            <div
              className={`${border === BorderShape.RECTANGULAR ? 'border-white bg-muted/50' : 'border-gray-400'} hover:border-white hover:bg-muted/50 bg-muted/30 h-[100px] border-2 rounded-lg flex items-end justify-start`}
            >
              <div className="h-[60%] w-[70%] rounded-bl-md border-t-2 border-r-2 border-gray-400 bg-muted"></div>
            </div>
          </button>
        </div>
        {/* TODO: multiple styles */}
        {/* <p className="text-gray-300 text-xs mb-2 mt-4">Style</p>
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
