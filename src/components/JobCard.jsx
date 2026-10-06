import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate, formatSalary } from '../data/jobs.js';

export default function JobCard({ job }) {
  return (
    <article className="job-card">
      <div className="job-card-top">
        <div className="company-avatar" aria-hidden="true">{job.company.trim().charAt(0).toUpperCase()}</div>
        <span className="job-date">{formatDate(job.postedAt)}</span>
      </div>
      <p className="eyebrow">{job.category}</p>
      <h3><Link to={`/jobs/${job.id}`}>{job.title}</Link></h3>
      <p className="company-name">{job.company}</p>
      <div className="job-meta">
        <span><span aria-hidden="true">⌖</span> {job.city}</span>
        <span><span aria-hidden="true">◷</span> {job.type}</span>
      </div>
      <div className="job-card-bottom">
        <strong>{formatSalary(job.salary)}</strong>
        <Link className="text-link" to={`/jobs/${job.id}`}>Batafsil <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}
