import { Skeleton } from '@/components/ui/skeleton'

export const TableSkeleton = () => (
  <div className='w-full rounded-md border'>
    <div className='my-4 flex w-full justify-around'>
      <Skeleton className='h-6 w-36' />
      <Skeleton className='h-6 w-36' />
      <Skeleton className='h-6 w-36' />
      <Skeleton className='h-6 w-36' />
      <Skeleton className='h-6 w-36' />
      <Skeleton className='h-6 w-36' />
    </div>
    <div>
      {Array.from({ length: 25 }, (_, index) => (
        <div className='mx-3 border-y py-4' key={index}>
          <Skeleton className='h-6' />
        </div>
      ))}
    </div>
  </div>
)
