import { atom } from 'jotai'

// backgrounds
import bgImage from '@renderer/assets/images/bg.jpeg'
import bgImage2 from '@renderer/assets/images/bg-2.jpeg'
import bgImage3 from '@renderer/assets/images/bg-3.jpeg'
import bgImage4 from '@renderer/assets/images/bg-4.jpeg'

export const backgrounds = [bgImage, bgImage2, bgImage3, bgImage4]

export enum BorderShape {
  ROUNDED,
  RECTANGULAR
}

export enum Layouts {
  SCREEN_ONLY,
  SCREEN_BACKGROUND,
  SCREEN_CAMERA_RIGHT,
  SCREEN_CAMERA_LEFT
}

export interface ZoomSpec {
  fromFrameNumber: number
  toFrameNumber: number
  scale: number
}

export interface ClipSpec {
  fromFrameNumber: number
  toFrameNumber: number
}

export const backgroundAtom = atom<string>('')

export const borderAtom = atom<BorderShape>(BorderShape.ROUNDED)

export const layoutAtom = atom<Layouts>(Layouts.SCREEN_ONLY)

export const zoomsAtom = atom<ZoomSpec[]>([])
export const selectedZoomAtom = atom<number | null>(null)

// TODO: toFrameNumber by default should be max frames
export const clipsAtom = atom<ClipSpec[]>([{ fromFrameNumber: 0, toFrameNumber: 1000 }])
