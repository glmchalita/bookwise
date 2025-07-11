import { nanoid } from 'nanoid'
import slugify from 'slugify'

export default function generateProfileUrl(name: string) {
  const firstName = name.trim().split(' ')[0]
  const slug = slugify(firstName, { lower: true, strict: true })
  return `${slug}-${nanoid(6)}`
}
