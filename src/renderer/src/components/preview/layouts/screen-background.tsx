import { AspectRatio } from '@renderer/components/ui/aspect-ratio'
import { BorderShape, backgroundAtom, borderAtom } from '@renderer/store/editing'
import { useAtomValue } from 'jotai'

import mockFrame from '@renderer/assets/images/frame.png'

export default function PreviewScreenBackground() {
  const background = useAtomValue(backgroundAtom)
  const border = useAtomValue(borderAtom)

  return (
    <AspectRatio
      ratio={16 / 9}
      style={{ backgroundImage: `url(${background})` }}
      className={'flex justify-center items-center rounded-md bg-cover bg-center bg-no-repeat'}
    >
      <img
        src={mockFrame}
        className={`${border === BorderShape.ROUNDED ? 'rounded-md' : ''} z-10 object-cover w-[80%]`}
        alt=""
      />
    </AspectRatio>
  )
}
