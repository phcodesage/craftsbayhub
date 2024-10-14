'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Lock } from 'lucide-react'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (response.ok) {
      router.push('/api/auth/signin')
    } else {
      const data = await response.json()
      setError(data.error || 'Registration failed')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        {error && <div className="text-red-500 text-center">{error}</div>}
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <div className="relative">
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white pl-10"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <User className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Lock className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors duration-200">
          Register
        </button>
      </form>
    </div>
  )
}