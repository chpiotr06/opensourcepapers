export type ArticleShort = {
  id: string
  created_at: string
  title: string
  author: string
  co_authors: string
  discipline: string
  image_url: string
}

export type ArticleDetails = {
  created_at: string
  title: string
  author: string | null
  co_authors: string | null
  discipline: string
  short_desc: string
  abstract: string
  article_url: string
  article_no_personal_url: string
  image_url: string
  id: string
  is_reviewed: string
}

export type ArticleShortResponse = {
  data: ArticleShort[]
}

export type ArticleDetailsResponse = {
  data: ArticleDetails[]
}
