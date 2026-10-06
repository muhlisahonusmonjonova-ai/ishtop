import React from 'react';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobCard.jsx';

export default function MyJobsPage({ jobs, setJobs }) {
  const myJobs = jobs.filter((job) => job.isUserPosted);

  function removeJob(id) {
    if (window.confirm('Bu e’lonni o‘chirishni xohlaysizmi?')) setJobs((current) => current.filter((job) => job.id !== id));
  }

  return (
    <section className="section my-jobs-page"><div className="container">
      <div className="page-title-row"><div><p className="eyebrow">ISH BERUVCHI PANELI</p><h1>Mening e’lonlarim</h1><p className="page-lead">Joylashtirgan ish e’lonlaringizni boshqaring.</p></div><Link className="button button-primary" to="/post-job">+ Yangi e’lon</Link></div>
      {myJobs.length ? <div className="job-grid my-jobs-grid">{myJobs.map((job) => <div className="managed-job" key={job.id}><JobCard job={job} /><div className="managed-actions"><Link to={`/post-job/${job.id}`}>✎ Tahrirlash</Link><button type="button" onClick={() => removeJob(job.id)}>O‘chirish</button></div></div>)}</div> : <div className="empty-state my-empty"><span className="empty-icon">＋</span><h2>Hozircha e’lonlaringiz yo‘q</h2><p>Birinchi ish e’loningizni joylashtiring va kerakli nomzodlarni toping.</p><Link className="button button-primary" to="/post-job">Birinchi e’lonni joylash <span aria-hidden="true">→</span></Link></div>}
    </div></section>
  );
}
