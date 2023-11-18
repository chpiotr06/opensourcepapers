export default function ArticlePage({ params }: { params: { slug: string } }) {
  return <div>Article: {params.slug}</div>
}
