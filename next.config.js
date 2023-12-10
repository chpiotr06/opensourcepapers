/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './src/lib/supabaseImageLoader.ts',
  },
}

module.exports = nextConfig
