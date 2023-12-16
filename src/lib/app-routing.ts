export const appRouting = {
  login: '/login',
  register: '/register',
  scientificRegister: '/scientific-register',
  articles: {
    default: '/articles',
    toReview: '/articles/to-reviev',
    addArticle: '/articles/add-article',
    slug: (slug: string) => `/articles/${slug}`,
    addReview: (articleId: string) => `/articles/add-review/${articleId}`,
  },
  search: '/search',
  admin: '/admin',
}
