export default function supabaseLoader({ src }: { src: string }) {
  return `https://${process.env.NEXT_PUBLIC_PROJECT_REF}.supabase.co/storage/v1/object/public/public_bucket/${src}`
}
