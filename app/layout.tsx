'use client'
import { SessionProvider } from 'next-auth/react'
import './globals.css'
import { Inter } from 'next/font/google'
import { Session } from 'next-auth'
const inter = Inter({ subsets: ['latin'] })

 

export default function RootLayout({
  children,
  session
}: {
  children: React.ReactNode,
  session : Session
}) {
  return (
    <html lang="en">
      <body >
        <SessionProvider session={session}>
          {children}
        </SessionProvider>    
      </body>
    </html>
  )
}
