import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CraftsBayHub',
  description: 'Alternative solution for job seekers and employers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-blue-600 text-white p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">CraftsBayHub</Link>
            <ul className="flex space-x-4">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/jobs">Jobs</Link></li>
              <li><Link href="/post-job">Post a Job</Link></li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto mt-8 px-4">
          {children}
        </main>
        <footer className="bg-gray-200 mt-8 py-4">
          <div className="container mx-auto text-center">
            © 2023 CraftsBayHub. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}