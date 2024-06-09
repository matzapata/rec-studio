import { Layouts, layoutAtom } from '@renderer/store/editing'
import { useAtomValue } from 'jotai'
import PreviewScreenBackground from './layouts/screen-background'
import PreviewScreenOnly from './layouts/screen-only'
import PreviewScreenCameraRight from './layouts/screen-camera-right'
import PreviewScreenCameraLeft from './layouts/screen-camera-left'

export function Preview() {
  const layout = useAtomValue(layoutAtom)

  if (layout === Layouts.SCREEN_BACKGROUND) {
    return <PreviewScreenBackground />
  } else if (layout === Layouts.SCREEN_ONLY) {
    return <PreviewScreenOnly />
  } else if (layout === Layouts.SCREEN_CAMERA_RIGHT) {
    return <PreviewScreenCameraRight />
} else if (layout === Layouts.SCREEN_CAMERA_LEFT) {
    return <PreviewScreenCameraLeft />
  } else return <PreviewScreenBackground />
}
