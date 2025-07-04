'use client'

import { useQuery } from '@tanstack/react-query'
import type { RecentReviewResponse } from '@/app/api/recent-reviews/route'
import { api } from '@/lib/axios'
import { Card } from './card'

export function RecentReviews() {
  const { data: recentReviews } = useQuery<RecentReviewResponse[]>({
    queryKey: ['recent-reviews'],
    queryFn: async () => {
      const res = await api.get(`/recent-reviews`)

      return res.data
    },
  })

  return (
    <div className="mt-4 flex flex-col gap-3">
      {recentReviews?.map((recentReview) => {
        return <Card key={recentReview.id} recentReview={recentReview} />
      })}
    </div>
  )
}
