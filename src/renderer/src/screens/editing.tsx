import { Image, LayoutTemplate, Scissors, Spline, ZoomIn } from 'lucide-react'
import { useState } from 'react'
import { BackgroundPanel } from '@renderer/components/editing-panels/background-panel'
import { ZoomPanel } from '@renderer/components/editing-panels/zoom-panel'
import { PlayBar } from '@renderer/components/timeline-bars/play-bar'
import { TrimBar } from '@renderer/components/timeline-bars/trim-bar'
import { ZoomBar } from '@renderer/components/timeline-bars/zoom-bar'

// mock images
import mockFrame from '@renderer/assets/images/frame.png'
import { LayoutPanel } from '@renderer/components/editing-panels/layout-panel'
import { BorderPanel } from '@renderer/components/editing-panels/border-panel'
import { TrimPanel } from '@renderer/components/editing-panels/trim-panel'

enum EditingPanel {
  BACKGROUND,
  ZOOM,
  LAYOUT,
  TRIM,
  BORDERS,
  CROP
}

export default function Editing() {
  const [panel, setPanel] = useState<EditingPanel>(EditingPanel.BACKGROUND)

  return (
    <div className="h-screen bg-card">
      <div className="flex flex-col h-full">
        <header className="h-12 mb-2  top-0 left-0 w-screen border-b"></header>

        <div className="flex h-full gap-2 pb-2">
          {/* preview */}
          <div className="flex w-full flex-col pl-2">
            <div className="flex w-full  flex-grow items-start">
              <img className="object-contain rounded-xl border-4" src={mockFrame} />
            </div>
          </div>

          {/* tools panel */}
          <div style={{ width: '800px' }} className="pr-2 flex space-x-2">
            {/* panel */}
            <div className="rounded-md bg-card w-full p-6 border">
              {panel === EditingPanel.BACKGROUND ? (
                <BackgroundPanel />
              ) : panel === EditingPanel.ZOOM ? (
                <ZoomPanel />
              ) : panel === EditingPanel.LAYOUT ? (
                <LayoutPanel />
              ) : panel === EditingPanel.BORDERS ? (
                <BorderPanel />
              ) : panel === EditingPanel.TRIM ? (
                <TrimPanel />
              ) : null}
            </div>

            {/* menu panel */}
            <div className="flex-col w-10 space-y-4 bg-card border rounded-md">
              <button
                onClick={() => setPanel(EditingPanel.BACKGROUND)}
                className="w-full p-2 hover:bg-accent rounded-md"
              >
                <Image className="text-white" />
              </button>

              <button
                onClick={() => setPanel(EditingPanel.LAYOUT)}
                className="w-full p-2 hover:bg-accent rounded-md"
              >
                <LayoutTemplate className="text-white" />
              </button>

              <button
                onClick={() => setPanel(EditingPanel.ZOOM)}
                className="w-full p-2 hover:bg-accent rounded-md"
              >
                <ZoomIn className="text-white" />
              </button>

              <button
                onClick={() => setPanel(EditingPanel.BORDERS)}
                className="w-full p-2 hover:bg-accent rounded-md"
              >
                <Spline className="text-white" />
              </button>

              <button
                onClick={() => setPanel(EditingPanel.TRIM)}
                className="w-full p-2 hover:bg-accent rounded-md"
              >
                <Scissors className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Timeline bar */}
        {panel === EditingPanel.ZOOM ? (
          <ZoomBar />
        ) : panel === EditingPanel.TRIM ? (
          <TrimBar />
        ) : (
          <PlayBar />
        )}
      </div>
    </div>
  )
}
