export const API = `${process.env.NEXT_PUBLIC_API_URL}/api`

export const endpoints = {
  user: {
    register: '/register',
    scientificRegister: '/scientific-register',
    usersToVerify: '/users-to-verify',
    verifyUser: (id: string) => `/users-to-verify/verify-user/${id}`,
    login: '/login',
    logout: '/signout',
    userDetails: '/user-details',
  },
  articles: {
    addArticle: '/articles/add-article',
  },
}
