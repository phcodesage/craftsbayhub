'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { MessageSquare, Heart, ThumbsDown } from 'lucide-react'

interface TopicInteractionsProps {
  topicId: string
  commentCount: number
  likeCount: number
  dislikeCount: number
}

export default function TopicInteractions({ topicId, commentCount, likeCount, dislikeCount }: TopicInteractionsProps) {
  const { data: session } = useSession()
  const [likes, setLikes] = useState(likeCount)
  const [dislikes, setDislikes] = useState(dislikeCount)

  const handleLike = async () => {
    if (!session) {
      alert('You must be logged in to like a topic')
      return
    }

    const response = await fetch(`/api/topics/${topicId}/like`, { method: 'POST' })
    if (response.ok) {
      setLikes(likes + 1)
    }
  }

  const handleDislike = async () => {
    if (!session) {
      alert('You must be logged in to dislike a topic')
      return
    }

    const response = await fetch(`/api/topics/${topicId}/dislike`, { method: 'POST' })
    if (response.ok) {
      setDislikes(dislikes + 1)
    }
  }

  return (
    <div className="flex items-center space-x-4 mt-4">
      <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
        <MessageSquare size={20} />
        <span>{commentCount}</span>
      </button>
      <button onClick={handleLike} className="flex items-center space-x-1 text-gray-500 hover:text-red-500">
        <Heart size={20} />
        <span>{likes}</span>
      </button>
      <button onClick={handleDislike} className="flex items-center space-x-1 text-gray-500 hover:text-yellow-500">
        <ThumbsDown size={20} />
        <span>{dislikes}</span>
      </button>
    </div>
  )
}