'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { Input } from './input'

const searchQuery = z.object({
  search: z.string(),
})

type SearchQuery = z.infer<typeof searchQuery>

interface ExplorerSearchProps {
  initialQuery: string
}

export default function ExplorerSearch({ initialQuery = '' }: ExplorerSearchProps) {
  const { control, handleSubmit } = useForm<SearchQuery>({
    defaultValues: { search: initialQuery },
  })

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function handleSearch({ search }: SearchQuery) {
    const params = new URLSearchParams(Array.from(searchParams.entries()))
    const q = search?.trim() ?? ''

    if (q) params.set('q', q)
    else params.delete('q')

    const href = `${pathname}${params.toString() ? `?${params.toString()}` : ''}`
    router.replace(href)
  }

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="w-full">
      <Controller
        name="search"
        control={control}
        render={({ field }) => <Input placeholder="Buscar livro ou autor" {...field} />}
      />
    </form>
  )
}
