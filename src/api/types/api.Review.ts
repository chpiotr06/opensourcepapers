export type Review = {
  title: string
  author: string
  co_authors: string
  description: string
  review_url: string
  created_at: string
  id: string
}

export type ReviewsResponse = {
  data: Review[]
}
