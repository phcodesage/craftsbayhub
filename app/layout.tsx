'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useSession, SessionProvider } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <html lang="en" className={`${inter.className} ${darkMode ? 'dark' : ''}`}>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <header className="bg-white dark:bg-gray-800 shadow-md">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
              Forum Website
            </Link>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              {session && session.user ? (
                <>
                  <span className="text-sm">Welcome, {session.user.name}</span>
                  <Link href="/api/auth/signout" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200">
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/api/auth/signin" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
                    Login
                  </Link>
                  <Link href="/register" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200">
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LayoutContent>{children}</LayoutContent>
    </SessionProvider>
  )
}

