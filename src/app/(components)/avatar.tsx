import Image from 'next/image'

interface AvatarProps {
  avatarUrl: string | null | undefined
  name: string
  size: number
}

export function Avatar({ avatarUrl, name, size }: AvatarProps) {
  size = size - 4

  return (
    <div className="h-fit rounded-full bg-gradient-vertical p-0.5">
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          height={size}
          width={size}
          quality={100}
          alt="Profile image"
          className={`rounded-full object-cover`}
          style={{ width: size, height: size }}
        />
      ) : (
        <div className={`flex items-center justify-center`} style={{ width: size, height: size }}>
          <span>{name[0]}</span>
        </div>
      )}
    </div>
  )
}
