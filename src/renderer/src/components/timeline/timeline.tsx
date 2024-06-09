import { useAtomValue, useSetAtom } from 'jotai'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { pxsPerFrameAtom, totalFramesAtom } from '@renderer/store/config'
import { timelineCurrentFrameAtom } from '@renderer/store/timeline'
import Draggable from 'react-draggable'

export function Timeline(props: { children?: React.ReactElement }) {
  const totalFrames = useAtomValue(totalFramesAtom)
  const pxsPerFrame = useAtomValue(pxsPerFrameAtom)
  const setCurrentFrame = useSetAtom(timelineCurrentFrameAtom)

  return (
    <ScrollArea>
      <div
        style={{ width: totalFrames * pxsPerFrame }}
        className="relative h-[40px] border rounded-md my-8"
      >
        <Draggable
          axis="x"
          bounds="parent"
          onDrag={(_, data) => setCurrentFrame(Math.floor(data.x / pxsPerFrame))}
        >
          <div className="w-1 h-14 z-30 bg-red-600 rounded-sm cursor-pointer absolute -top-2"></div>
        </Draggable>

        {props.children}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
