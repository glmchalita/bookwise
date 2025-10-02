import Image from 'next/image'

interface CoverProps {
  src: string
  alt: string
  heigth: number
  width: number
}

export function Cover({ src, alt, heigth, width }: CoverProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={heigth}
      quality={100}
      style={{ width: width, height: heigth }}
    />
  )
}
