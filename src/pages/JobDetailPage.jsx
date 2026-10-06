import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatDate, formatSalary } from '../data/jobs.js';

export default function JobDetailPage({ jobs }) {
  const { jobId } = useParams();
  const job = jobs.find((item) => item.id === jobId);

  if (!job) return <div className="container empty-state page-empty"><span className="empty-icon">⌕</span><h2>Ish e’loni topilmadi</h2><p>E’lon o‘chirilgan yoki manzil noto‘g‘ri bo‘lishi mumkin.</p><Link className="button button-primary" to="/jobs">Ishlarni ko‘rish</Link></div>;

  return (
    <section className="section detail-section">
      <div className="container detail-container">
        <Link className="back-link" to="/jobs">← Ishlar ro‘yxatiga qaytish</Link>
        <div className="detail-card">
          <div className="detail-heading"><div className="company-avatar company-avatar-large">{job.company.trim().charAt(0).toUpperCase()}</div><div><p className="eyebrow">{job.category} <span className="detail-dot">·</span> {formatDate(job.postedAt)}</p><h1>{job.title}</h1><p className="company-name">{job.company}</p></div></div>
          <div className="detail-summary"><div><span className="summary-icon">⌖</span><small>Joylashuv</small><strong>{job.city}</strong></div><div><span className="summary-icon">◷</span><small>Ish turi</small><strong>{job.type}</strong></div><div><span className="summary-icon">↗</span><small>Maosh</small><strong>{formatSalary(job.salary)}</strong></div></div>
          <div className="detail-content"><div><h2>Ish haqida</h2><p>{job.description}</p><h2 className="requirements-title">Bog‘lanish</h2><p>Ishga ariza berish yoki qo‘shimcha ma’lumot olish uchun ish beruvchi bilan bog‘laning.</p><a className="contact-link" href={job.contact.includes('@') ? `mailto:${job.contact}` : `tel:${job.contact.replace(/\s/g, '')}`}>{job.contact}</a></div><aside className="apply-panel"><span className="apply-check">✓</span><h3>Bu ish sizga mosmi?</h3><p>Imkoniyatni qo‘ldan boy bermang — hoziroq ish beruvchiga murojaat qiling.</p><a className="button button-primary apply-button" href={job.contact.includes('@') ? `mailto:${job.contact}` : `tel:${job.contact.replace(/\s/g, '')}`}>Bog‘lanish <span aria-hidden="true">→</span></a></aside></div>
        </div>
      </div>
    </section>
  );
}
