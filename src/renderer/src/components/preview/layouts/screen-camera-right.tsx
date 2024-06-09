import { AspectRatio } from '@renderer/components/ui/aspect-ratio'
import { BorderShape, backgroundAtom, borderAtom } from '@renderer/store/editing'
import { useAtomValue } from 'jotai'

import mockFrame from '@renderer/assets/images/frame.png'
import mockCamera from '@renderer/assets/images/camera.png'

export default function PreviewScreenCameraRight() {
  const background = useAtomValue(backgroundAtom)
  const border = useAtomValue(borderAtom)

  return (
    <AspectRatio
      ratio={16 / 9}
      style={{ backgroundImage: `url(${background})` }}
      className={'flex justify-evenly items-center rounded-md bg-cover bg-center bg-no-repeat'}
    >
      <img
        src={mockFrame}
        className={`${border === BorderShape.ROUNDED ? 'rounded-md' : ''} z-10 object-cover w-[70%] h-[80%]`}
        alt=""
      />
      <img
        src={mockCamera}
        className={`${border === BorderShape.ROUNDED ? 'rounded-md' : ''} z-10 object-cover w-[20%] h-[60%]`}
        alt=""
      />
    </AspectRatio>
  )
}
