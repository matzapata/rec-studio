import { useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'

import bgImage from '@renderer/assets/images/bg.jpeg'
import bgImage2 from '@renderer/assets/images/bg-2.jpeg'
import bgImage3 from '@renderer/assets/images/bg-3.jpeg'
import bgImage4 from '@renderer/assets/images/bg-4.jpeg'

export function BackgroundPanel() {
  const backgrounds = [bgImage, bgImage2, bgImage3, bgImage4]
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
                className={`${selected === i ? 'border-4 border-spacing-2 border-primary' : 'hover:border-2 hover:border-primary '} rounded-md h-[100px] w-full object-cover`}
              />
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
