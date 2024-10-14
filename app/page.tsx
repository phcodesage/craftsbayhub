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
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center border-t border-gray-700 pt-6">
            <p>&copy; 2024 CraftsBayHub. All rights reserved.</p>
            <div className="flex space-x-4 text-sm">
              <Link href="/contact" className="hover:text-gray-300">
                Contact us
              </Link>
              <Link href="/terms" className="hover:text-gray-300">
                Terms and rules
              </Link>
              <Link href="/privacy" className="hover:text-gray-300">
                Privacy policy
              </Link>
              <Link href="/help" className="hover:text-gray-300">
                Help
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
