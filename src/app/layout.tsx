import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SessionAuthProvider from '@/context/SessionAuthProvider'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TypeTask',
  description: 'Web task aplication'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionAuthProvider>
          {children}
        </SessionAuthProvider>
      </body>
    </html>
  )
}
