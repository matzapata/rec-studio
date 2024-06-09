import { AspectRatio } from '@renderer/components/ui/aspect-ratio'

import mockFrame from '@renderer/assets/images/frame.png'

export default function PreviewScreenOnly() {
  return (
    <AspectRatio ratio={16 / 9} className={'flex justify-center items-center rounded-md'}>
      <img src={mockFrame} className={`z-10 object-cover`} alt="" />
    </AspectRatio>
  )
}
