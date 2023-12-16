import * as z from 'zod'

export const formSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Imię musi mieć co najmniej dwa znaki' })
      .max(25, { message: 'Imie moze mieć co najwyżej 25 znaków' }),
    surname: z
      .string()
      .min(2, { message: 'Nazwisko musi mieć co najmniej dwa znaki' })
      .max(25, { message: 'Nazwisko moze mieć co najwyżej 25 znaków' }),
    email: z.string().email('Nie podano poprawnego adresu email'),
    password: z.string().min(6, { message: 'Hasło musi mieć co najmniej 6 znaków' }),
    confirmPassword: z.string(),
    institution: z.string().min(2, { message: 'Nazwa instytucji musi mieć co najmniej dwa znaki' }),
    degree: z.string().min(2, { message: 'Stopień naukowy musi mieć co najmniej dwa znaki' }),
    scientific_discipline: z.string().min(2, { message: 'Dyscyplina naukowa musi mieć co najmniej dwa znaki' }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Podane hasła nie są takie same',
    path: ['confirmPassword'],
  })

export type FormSchema = z.infer<typeof formSchema>
