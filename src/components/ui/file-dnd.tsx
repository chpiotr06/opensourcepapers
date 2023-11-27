'use client'

import { Upload } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { Typography } from '@/components/ui/typography'
import { useToast } from '@/components/ui/use-toast'
import { filesizeSuffix } from '@/helpers/filesizeSuffix'
import { createClient } from '@/lib/supabase/clientComponentClient'
import { cn } from '@/lib/utils'

const MAX_FILE_SIZE = 30_000_000

type FileDragAndDropProps = {
  folderName: string
  fileName: string
}

export const FileDragAndDrop = ({ folderName, fileName }: FileDragAndDropProps) => {
  const { toast } = useToast()
  const supabase = createClient()
  const onDropHandler = async (acceptedFile: File[]) => {
    const { error } = await supabase.storage.from('example_bucket').upload(`${folderName}/${fileName}`, acceptedFile[0])
    if (!error) {
      toast({
        variant: 'success',
        duration: 5000,
        title: 'Plik wrzucono na serwer poprawnie',
      })
    } else {
      toast({
        variant: 'destructive',
        duration: 5000,
        title: 'Błędny email lub hasło',
        description:
          'Pliku nie udało sie umieścić na serwerze. Sprobuj jeszcze raz. Jesli problem bedzie się powtarzał, skontaktuj się z nami',
      })
    }
  }
  const { acceptedFiles, isFocused, isFileDialogActive, isDragActive, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    onDrop: onDropHandler,
  })

  return (
    <div className='flex flex-col gap-2'>
      <div
        {...getRootProps()}
        className={cn(
          'flex w-full flex-col items-center justify-center gap-3 rounded border border-dashed border-foreground py-4 hover:border-primary',
          {
            'border-primary': isFocused || isFileDialogActive || isDragActive,
          }
        )}
      >
        <input {...getInputProps()} />
        <Upload />
        <Typography variant='p-12-400' className='text-main-600'>
          Przeciągnij i upuść plik lub <span className='text-dominant'>wyszukaj</span>
        </Typography>
        <Typography variant='p-10-400' className='text-main-600'>
          Maksymalny rozmiar to 30 MB
        </Typography>
      </div>
      {acceptedFiles &&
        acceptedFiles.map((file) => (
          <div
            key={file.name}
            className='border-dominant bg-main-200 flex w-full flex-col rounded border pb-1 pl-2 pr-0 pt-2'
          >
            <div className='flex items-center'>
              <div className='flex w-[80%] items-center gap-2'>
                <Upload />
                <Typography variant='p-12-500'>{file.name}</Typography>
              </div>
              <div className='flex w-[20%] justify-center'>
                <Typography variant='p-10-400'>{filesizeSuffix(file.size)}</Typography>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
