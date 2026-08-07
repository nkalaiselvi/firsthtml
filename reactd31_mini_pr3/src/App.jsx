import './App.css'

function JobCard({ company, role, salary, location }) {
  return (
    <article className="job-card">
      <p className="company">{company}</p>
      <h2>{role}</h2>
      <div className="job-meta">
        <span>Salary: {salary}</span>
        <span>Location: {location}</span>
      </div>
    </article>
  )
}

const jobs = [
  {
    company: 'Nexora Labs',
    role: 'Frontend Developer',
    salary: '$95k - $120k',
    location: 'Remote',
  },
  {
    company: 'BluePeak',
    role: 'UI Engineer',
    salary: '$85k - $110k',
    location: 'London',
  },
  {
    company: 'Orbit Systems',
    role: 'React Developer',
    salary: '$90k - $115k',
    location: 'New York',
  },
]

function App() {
  return (
    <main className="app-shell">
      <header className="hero-section">
        <p className="eyebrow">Mini Project 3</p>
        <h1>Find your next opportunity</h1>
        <p className="subtitle">Browse modern roles from growing teams.</p>
      </header>

      <section className="job-grid" aria-label="Job listings">
        {jobs.map((job) => (
          <JobCard
            key={job.role}
            company={job.company}
            role={job.role}
            salary={job.salary}
            location={job.location}
          />
        ))}
      </section>
    </main>
  )
}

export default App
