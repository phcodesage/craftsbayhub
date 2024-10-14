import { Comment, User } from '@prisma/client'

interface CommentWithAuthor extends Comment {
  author: User
}

export default function CommentList({ comments }: { comments: CommentWithAuthor[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <p className="text-gray-600 dark:text-gray-400 mb-2">{comment.content}</p>
          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <span>Posted by {comment.author.username}</span>
            <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  )
}