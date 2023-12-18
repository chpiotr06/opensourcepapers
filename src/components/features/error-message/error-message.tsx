'use client'

import { AlertCircle, RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

type ErrorMessageProps = {
  refetch?: () => void
  description: string
  title: string
  hideButton?: boolean
}

export const ErrorMessage = ({ refetch, description, title, hideButton = false }: ErrorMessageProps) => (
  <Card>
    <div className='relative my-4 flex h-full flex-col items-center justify-center overflow-auto px-4'>
      <CardHeader>
        <div className='flex flex-row items-center pb-2.5'>
          <AlertCircle className='text-destructive' />
          <Typography className='pl-2 text-center' variant='p-12-500'>
            {title}
          </Typography>
        </div>
      </CardHeader>
      <CardContent>
        <Typography className='pb-4 text-center'>{description}</Typography>
        {!hideButton && refetch && (
          <Button className='bg-main-100' onClick={refetch}>
            <RefreshCcw className='mr-2.5 align-middle' />
            <Typography variant='p-14-500'>Refresh</Typography>
          </Button>
        )}
      </CardContent>
    </div>
  </Card>
)
