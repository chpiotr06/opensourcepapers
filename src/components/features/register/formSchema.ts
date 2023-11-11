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
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Podane hasła nie są takie same',
    path: ['confirmPassword'],
  })
