import Link from 'next/link'

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to CraftsBayHub</h1>
      <p className="text-xl mb-8">Find your next opportunity or the perfect candidate</p>
      <div className="space-x-4">
        <Link href="/jobs" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Find Jobs
        </Link>
        <Link href="/post-job" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
          Post a Job
        </Link>
      </div>
    </div>
  )
}