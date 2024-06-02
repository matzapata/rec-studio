import { ArrowLeft } from 'lucide-react'
import { JSX, useState } from 'react'
import bgImage from '@renderer/assets/images/bg.webp'

enum LayoutTab {
  LAYOUT,
  BACKGROUND
}

export default function SelectLayout(): JSX.Element {
  const [tab, setTab] = useState<LayoutTab>(LayoutTab.LAYOUT)

  return (
    <>
      <header className="h-20 bg-white flex items-end pb-3 px-4 border-b sticky top-0">
        <div className="flex items-center space-x-2">
          <button>
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h1 className="font-medium text-slate-700">Select layout</h1>
        </div>
      </header>

      <div className="w-full flex border-b">
        <button
          className={`${tab === LayoutTab.LAYOUT ? 'border-b-2 border-purple-500' : ''} w-1/2 py-2 text-sm`}
          onClick={() => setTab(LayoutTab.LAYOUT)}
        >
          Layout
        </button>
        <button
          className={`${tab === LayoutTab.BACKGROUND ? 'border-b-2 border-purple-500' : ''} w-1/2 py-2 text-sm`}
          onClick={() => setTab(LayoutTab.BACKGROUND)}
        >
          Background
        </button>
      </div>

      {tab == LayoutTab.LAYOUT ? (
        <div className="py-6 px-4 space-y-4">
          {/* screen only */}
          <div
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            className="outline outline-4 outline-purple-500 w-full h-28 rounded-lg flex justify-center items-center relative"
          >
            <div className="bg-gray-50 w-[80%] h-[80%] rounded absolute left-[1.7rem] top-[0.7rem]"></div>
          </div>

          {/* Screen and camera right */}
          <div
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            className="border w-full h-28 rounded-lg flex justify-center items-center relative"
          >
            <div className="bg-gray-50 w-10 h-[60%] rounded absolute right-4 top-[1.5rem]"></div>
            <div className="bg-gray-50 w-44 h-[80%] rounded absolute left-4 top-[0.7rem]"></div>
          </div>

          {/* Screen and camera left */}
          <div
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            className="border w-full h-28 rounded-lg flex justify-center items-center relative"
          >
            <div className="bg-gray-50 w-10 h-[60%] rounded absolute left-4 top-[1.5rem]"></div>
            <div className="bg-gray-50 w-44 h-[80%] rounded absolute right-4 top-[0.7rem]"></div>
          </div>
        </div>
      ) : (
        <div>Background</div>
      )}
    </>
  )
}
