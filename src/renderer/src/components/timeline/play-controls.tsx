import { formatTime } from '@renderer/lib/format-time'
import { fpsAtom, totalFramesAtom } from '@renderer/store/config'
import { timelineCurrentFrameAtom } from '@renderer/store/timeline'
import { useAtomValue } from 'jotai'
import { Play } from 'lucide-react'

export function TimelinePlayControls(props: { className?: string }) {
  const fps = useAtomValue(fpsAtom)
  const totalFrames = useAtomValue(totalFramesAtom)
  const currentFrame = useAtomValue(timelineCurrentFrameAtom)

  return (
    <div className={`${props.className ? props.className : ''} flex space-x-3 items-center`}>
      <button className="">
        <Play className="text-white h-4 w-4" />
      </button>
      <span className="text-white text-sm">
        {formatTime(totalFrames / fps)} / {formatTime(currentFrame / fps)}
      </span>
    </div>
  )
}
