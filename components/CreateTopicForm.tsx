'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function CreateTopicForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { data: session } = useSession()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) {
      alert('You must be logged in to create a topic')
      return
    }

    const response = await fetch('/api/topics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    })

    if (response.ok) {
      setTitle('')
      setContent('')
      router.refresh()
    } else {
      alert('Failed to create topic')
    }
  }

  if (!session) {
    return null
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Create a New Topic</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          rows={4}
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
        Create Topic
      </button>
    </form>
  )
}