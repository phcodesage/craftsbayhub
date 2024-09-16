import Link from 'next/link'

// This would typically come from a database or API
const jobs = [
  { id: 1, title: 'Frontend Developer', company: 'TechCo', location: 'Remote' },
  { id: 2, title: 'UX Designer', company: 'DesignStudio', location: 'New York' },
  { id: 3, title: 'Data Scientist', company: 'DataCorp', location: 'San Francisco' },
]

export default function Jobs() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p>{job.company} - {job.location}</p>
            <Link href={`/jobs/${job.id}`} className="text-blue-600 hover:underline">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}