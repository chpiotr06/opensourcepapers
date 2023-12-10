export type ArticleShort = {
  id: string
  created_at: string
  title: string
  author: string
  co_authors: string
  discipline: string
  image_url: string
}

export type ArticleShortResponse = {
  data: ArticleShort[]
}
