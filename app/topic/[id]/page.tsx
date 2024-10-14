import Link from 'next/link'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import { User, Clock } from 'lucide-react'

const prisma = new PrismaClient()

export default async function TopicPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  }

  const topic = await prisma.topic.findUnique({
    where: { id: params.id },
    include: {
      posts: {
        include: {
          author: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })

  if (!topic) {
    return <div className="text-center text-2xl font-semibold">Topic not found</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8">Posts in {topic.name}</h2>
      <div className="space-y-4">
        {topic.posts.map((post) => (
          <Link key={post.id} href={`/post/${post.id}`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">{post.title}</h3>
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <User size={16} className="mr-2" />
                  <span>{post.author.username}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center">
        <Link href={`/topic/${params.id}/create-post`} className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition-colors duration-200">
          Create New Post
        </Link>
      </div>
    </div>
  )
}