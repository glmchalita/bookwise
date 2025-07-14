import * as RadixAvatar from '@radix-ui/react-avatar'

interface AvatarProps {
  avatarUrl: string | null
  name: string
  size: number
}

export function Avatar({ avatarUrl, name, size }: AvatarProps) {
  const normalizedAvatar = avatarUrl ?? undefined

  return (
    <RadixAvatar.Root
      className="inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-vertical p-0.5 align-middle"
      style={{ width: size, height: size }}
    >
      <RadixAvatar.Image
        src={normalizedAvatar}
        alt={name}
        height={size}
        width={size}
        className="size-full rounded-[inherit] object-cover"
      />
      <RadixAvatar.Fallback style={{fontSize: (size * 0.65)}}>{name[0]}</RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}
