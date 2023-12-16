import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Inter } from 'next/font/google'
import { TopBar } from '@/components/features/top-bar/top-bar'
import TanstackQueryProvider from '@/components/providers/tanstack-query-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Open Source Papers',
  description: 'Free access to scientific articles',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <SpeedInsights />
        <Analytics />
        <TanstackQueryProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <TopBar />
            {children}
            <Toaster />
          </ThemeProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  )
}
