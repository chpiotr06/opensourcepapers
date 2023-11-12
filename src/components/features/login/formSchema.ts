import * as z from 'zod'

export const formSchema = z.object({
  email: z.string().email('Nie podano poprawnego adresu email'),
  password: z.string().min(6, { message: 'Hasło musi mieć co najmniej 6 znaków' }),
})

export type FormSchema = z.infer<typeof formSchema>
