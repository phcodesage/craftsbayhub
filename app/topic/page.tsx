import Link from 'next/link'
import { PrismaClient } from '@prisma/client'
import { MessageSquare } from 'lucide-react'

const prisma = new PrismaClient()

export default async function Home() {
  const topics = await prisma.topic.findMany({
    include: {
      _count: {
        select: { posts: true }
      }
    }
  })

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to our Forum</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <Link key={topic.id} href={`/topic/${topic.id}`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">{topic.name}</h2>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <MessageSquare size={18} className="mr-2" />
                <span>{topic._count.posts} posts</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}