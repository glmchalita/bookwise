import Image from 'next/image'

interface AvatarProps {
  src: string | null
  name: string
  size: number
}
export function Avatar({ src, name, size }: AvatarProps) {
  return (
    <div
      className="inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-vertical p-0.5 align-middle"
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          height={size}
          width={size}
          className="size-full rounded-[inherit] object-cover"
        />
      ) : (
        <div
          className="flex size-full items-center justify-center rounded-[inherit]"
          style={{ fontSize: size * 0.65 }}
        >
          {name[0]}
        </div>
      )}
    </div>
  )
}
