import { Button } from '../ui/button'
import { Timeline } from '../timeline/timeline'
import { TimelinePlayControls } from '../timeline/play-controls'

export function PlayBar() {
  return (
    <div className="px-6 pt-4 bg-card border-t space-y-2">
      <div className="w-full flex justify-between">
        <TimelinePlayControls />

        {/* discard / export */}
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" size="sm">
            Discard
          </Button>
          <Button size="sm">Export</Button>
        </div>
      </div>

      <Timeline />
    </div>
  )
}
