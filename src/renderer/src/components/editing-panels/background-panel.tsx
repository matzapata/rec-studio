import { ScrollArea } from '../ui/scroll-area'
import { useAtom } from 'jotai'
import { backgroundAtom, backgrounds } from '@renderer/store/editing'

export function BackgroundPanel() {
  const [background, setBackground] = useAtom(backgroundAtom)

  return (
    <div className="flex flex-col ">
      <h1 className="text-white font-medium text-sm">Background</h1>
      <ScrollArea className=" mt-4">
        <div className="grid grid-cols-2 gap-2 w-full">
          {backgrounds.map((b, i) => (
            <button key={i} onClick={() => setBackground(b)}>
              <img
                src={b}
                className={`${background === b ? 'border-4 border-spacing-2 border-primary' : 'hover:border-2 hover:border-primary '} rounded-md h-[100px] w-full object-cover`}
              />
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
