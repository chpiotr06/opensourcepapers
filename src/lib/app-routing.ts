export const appRouting = {
  login: '/login',
  register: '/register',
  scientificRegister: '/scientific-register',
  articles: {
    default: '/articles',
    toReview: '/articles/to-reviev',
    addArticle: '/articles/add-article',
    slug: (slug: string) => `/articles/${slug}`,
    addReview: '/articles/add-review',
  },
  search: '/search',
  admin: '/admin',
}
