export const API = `${process.env.NEXT_PUBLIC_API_URL}/api`

export const endpoints = {
  user: {
    register: '/register',
    scientificRegister: '/scientific-register',
    usersToVerify: '/users-to-verify',
    login: '/login',
  },
}
