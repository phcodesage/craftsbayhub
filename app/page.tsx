// app/page.tsx
import Link from 'next/link'
import { PrismaClient } from '@prisma/client'
import { MessageSquare, Heart, ThumbsDown } from 'lucide-react'
import CreateTopicForm from '@/components/CreateTopicForm'
import TopicInteractions from '@/components/TopicInteractions'

const prisma = new PrismaClient()

export default async function Home() {
  const topics = await prisma.topic.findMany({
    include: {
      author: true,
      _count: {
        select: { comments: true, likes: true, dislikes: true }
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 20
  })

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header Navigation */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              CraftsBayHub
            </Link>
            <nav className="space-x-4">
              <Link href="/" className="text-gray-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white">
                Forums
              </Link>
              <Link href="/reviews" className="text-gray-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white">
                Reviews
              </Link>
              <Link href="/resources" className="text-gray-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white">
                Resources
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Welcome to our Forum
        </h1>
        <CreateTopicForm />
        <div className="space-y-6 mt-6">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <Link href={`/topic/${topic.id}`}>
                <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400 hover:underline">
                  {topic.title}
                </h2>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {topic.content}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span>Posted by {topic.author.username}</span>
                <span>{new Date(topic.createdAt).toLocaleDateString()}</span>
              </div>
              <TopicInteractions 
                topicId={topic.id}
                commentCount={topic._count.comments}
                likeCount={topic._count.likes}
                dislikeCount={topic._count.dislikes}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Site Description */}
      <div>
        <h3 className="text-lg font-semibold mb-4">CRAFTSBAYHUB.COM</h3>
        <p className="text-sm">
          We help each other to sell crafts online. Get started and register with us, learn how we make a full-time income working from home like a boss.
        </p>
      </div>

      {/* Custom Links 1 */}
      <div>
        <h3 className="text-lg font-semibold mb-4">CUSTOM LINKS 1</h3>
        <ul className="text-sm space-y-2">
          <li>
            <a href="#" className="hover:text-gray-300">HANDMADE FORUM</a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">ETSY FORUM</a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">CRAFT BUSINESS FORUM</a>
          </li>
        </ul>
      </div>

      {/* Custom Links 2 */}
      <div>
        <h3 className="text-lg font-semibold mb-4">CUSTOM LINKS 2</h3>
        <ul className="text-sm space-y-2">
          <li>
            <a href="#" className="hover:text-gray-300">CRAFT SUPPLIES FORUM</a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">DIY FORUM</a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">CRAFT FAIR FORUM</a>
          </li>
        </ul>
      </div>

      {/* Custom Links 3 */}
      <div>
        <h3 className="text-lg font-semibold mb-4">CUSTOM LINKS 3</h3>
        <ul className="text-sm space-y-2">
          <li>
            <a href="#" className="hover:text-gray-300">Craft Tutorials Forum</a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">Craft Photography Forum</a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">Craft Marketing Forum</a>
          </li>
        </ul>
      </div>
    </div>

    {/* Footer Bottom Section */}
    <div className="mt-8 border-t border-gray-700 pt-6 flex flex-wrap justify-between items-center">
      <div className="flex space-x-4 text-sm">
        <a href="#" className="hover:text-gray-300">Contact us</a>
        <a href="#" className="hover:text-gray-300">Terms and rules</a>
        <a href="#" className="hover:text-gray-300">Privacy policy</a>
        <a href="#" className="hover:text-gray-300">Help</a>
      </div>
      <div className="flex space-x-2 text-sm">
        <span>&copy; 2024 CraftsBayHub. All rights reserved.</span>
      </div>
    </div>

    {/* Disclaimer Section */}
    <div className="bg-gray-900 text-gray-400 text-xs p-4 mt-6 rounded-lg">
      CraftsBayHub.com – Helping crafters make a living online. All posts are personal opinions and do not constitute professional advice. Use forums responsibly, and always seek advice from experts where necessary.
    </div>
  </div>
</footer>

    </div>
  )
}
