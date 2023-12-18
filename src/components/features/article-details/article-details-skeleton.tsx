'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const ArticleDetailsSkeleton = () => (
  <div className='flex w-full flex-col items-center'>
    <Card className='max-w-5xl'>
      <CardHeader>
        <Skeleton className='h-9 max-w-2xl' />
      </CardHeader>
      <CardContent className='flex flex-col gap-3'>
        <Skeleton className='h-[600px] w-[970px]' />
        <Skeleton className='h-7 w-80' />
        <Skeleton className='h-7 w-80' />
        <Skeleton className='h-44 w-[768px]' />
        <Skeleton className='h-[40px] w-[188px]' />
      </CardContent>
    </Card>
    <Card className='mt-6 max-w-5xl'>
      <CardHeader>
        <Skeleton className='h-7 w-64' />
      </CardHeader>
      <CardContent>
        <Skeleton className='h-56 w-[970px]' />
      </CardContent>
    </Card>
  </div>
)
