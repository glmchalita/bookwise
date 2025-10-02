import Image from 'next/image'
import Link from 'next/link'

interface BaseAvatarProps {
  src: string | null
  name: string
  size: number
}

interface AvatarLinkProps extends BaseAvatarProps {
  variant?: 'link'
  profileUrl: string
}

interface AvatarDisplayProps extends BaseAvatarProps {
  variant: 'display'
  profileUrl?: never
}

type AvatarProps = AvatarLinkProps | AvatarDisplayProps

export function Avatar({ src, name, size, profileUrl, variant = 'link' }: AvatarProps) {
  return variant === 'link' ? (
    <Link href={`/profile/${profileUrl}`}>
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
    </Link>
  ) : (
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
