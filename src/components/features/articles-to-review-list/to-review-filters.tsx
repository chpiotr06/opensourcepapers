'use client'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Typography } from '@/components/ui/typography'
import { useQueryParams } from '@/lib/hooks/useQueryParams'

export const ArticlesToReviewFilters = () => {
  const searchParams = useSearchParams()
  const { mutateQueryParams } = useQueryParams()
  const [filters, setFilters] = useState(() => ({
    title: searchParams.get('title') || '',
    discipline: searchParams.get('discipline') || '',
  }))

  return (
    <Card className='h-fit min-w-fit'>
      <CardHeader>
        <Typography variant='h2-20-500'>Filtry</Typography>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <Label htmlFor='title'>Tytuł</Label>
        <Input
          id='title'
          value={filters['title']}
          onChange={(event) => setFilters((state) => ({ ...state, title: event.target.value }))}
        />
        <Label htmlFor='discipline'>Dyscyplina naukowa</Label>
        <Input
          id='discipline'
          value={filters['discipline']}
          onChange={(event) => setFilters((state) => ({ ...state, discipline: event.target.value }))}
        />
        <Button onClick={() => mutateQueryParams(filters)}>Zastosuj</Button>
      </CardContent>
    </Card>
  )
}
