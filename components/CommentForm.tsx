'use client'

import { useState } from 'react'
import { useSession } from  'next-auth/react'
import { useRouter } from 'next/navigation'

export default function CommentForm({ topicId }: { topicId: string }) {
  const [content, setContent] = useState('')
  const { data: session } = useSession()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) {
      alert('You must be logged in to comment')
      return
    }

    const response = await fetch(`/api/topics/${topicId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })

    if (response.ok) {
      setContent('')
      router.refresh()
    } else {
      alert('Failed to post comment')
    }
  }

  if (!session) {
    return null
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Add a Comment</h2>
      <div className="mb-4">
        <textarea
          placeholder="Your comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          rows={4}
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
        Post Comment
      </button>
    </form>
  )
}