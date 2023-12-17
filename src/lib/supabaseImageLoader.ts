export default function supabaseLoader({ src, width, quality }: { src: string; width: number; quality: number }) {
  return `https://${
    process.env.NEXT_PUBLIC_PROJECT_REF
  }.supabase.co/storage/v1/object/public/public_bucket/${src}?width=${width}&quality=${quality || 75}`
}
