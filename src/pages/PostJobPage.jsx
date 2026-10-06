import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CATEGORIES, CITIES, JOB_TYPES } from '../data/jobs.js';

const blankJob = { title: '', company: '', category: '', city: '', salary: '', type: '', description: '', contact: '' };

export default function PostJobPage({ jobs, setJobs }) {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const editingJob = jobId ? jobs.find((job) => job.id === jobId && job.isUserPosted) : null;
  const [form, setForm] = useState(blankJob);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingJob) setForm({ ...editingJob, salary: String(editingJob.salary) });
  }, [editingJob]);

  if (jobId && !editingJob) return <div className="container empty-state page-empty"><h2>E’lonni tahrirlab bo‘lmadi</h2><p>Bu e’lon topilmadi yoki tahrirlash uchun ruxsat yo‘q.</p><Link className="button button-primary" to="/my-jobs">Mening e’lonlarim</Link></div>;

  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const salary = Number(form.salary);
    if (!Number.isFinite(salary) || salary <= 0) {
      setError('Maoshni 0 dan katta raqamda kiriting.');
      return;
    }
    const normalized = { ...form, salary, title: form.title.trim(), company: form.company.trim(), description: form.description.trim(), contact: form.contact.trim() };
    if (editingJob) {
      setJobs((current) => current.map((job) => job.id === editingJob.id ? { ...job, ...normalized } : job));
    } else {
      const id = globalThis.crypto?.randomUUID?.() || `job-${Date.now()}`;
      setJobs((current) => [{ ...normalized, id, postedAt: new Date().toISOString(), isUserPosted: true }, ...current]);
    }
    navigate('/my-jobs');
  }

  return (
    <section className="section form-page"><div className="container form-container">
      <Link className="back-link" to="/my-jobs">← Mening e’lonlarimga qaytish</Link>
      <div className="form-intro"><p className="eyebrow">ISH BERUVCHILAR UCHUN</p><h1>{editingJob ? 'E’lonni tahrirlash' : 'Yangi ish e’loni'}</h1><p>Kerakli ma’lumotlarni kiriting va munosib nomzodlarni toping.</p></div>
      <form className="job-form" onSubmit={handleSubmit}>
        <div className="form-section-title"><span>01</span><div><h2>Asosiy ma’lumotlar</h2><p>Ish va kompaniya haqida qisqacha</p></div></div>
        <div className="form-grid">
          <label className="form-field">Ish nomi <span>*</span><input name="title" required maxLength="90" value={form.title} onChange={handleChange} placeholder="Masalan, Frontend dasturchi" /></label>
          <label className="form-field">Kompaniya nomi <span>*</span><input name="company" required maxLength="70" value={form.company} onChange={handleChange} placeholder="Kompaniya nomi" /></label>
          <label className="form-field">Kategoriya <span>*</span><select name="category" required value={form.category} onChange={handleChange}><option value="">Kategoriyani tanlang</option>{CATEGORIES.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="form-field">Shahar <span>*</span><select name="city" required value={form.city} onChange={handleChange}><option value="">Shaharni tanlang</option>{CITIES.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="form-field">Maosh (so‘m) <span>*</span><input name="salary" type="number" min="1000" step="1000" required value={form.salary} onChange={handleChange} placeholder="Masalan, 8000000" /></label>
          <label className="form-field">Ish turi <span>*</span><select name="type" required value={form.type} onChange={handleChange}><option value="">Ish turini tanlang</option>{JOB_TYPES.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>
        <div className="form-section-title form-section-spaced"><span>02</span><div><h2>Batafsil va aloqa</h2><p>Nomzodga kerakli ma’lumotlarni yozing</p></div></div>
        <div className="form-grid">
          <label className="form-field full-field">Ish haqida ma’lumot <span>*</span><textarea name="description" required rows="5" maxLength="1200" value={form.description} onChange={handleChange} placeholder="Vazifalar, talablar va takliflar haqida yozing..." /></label>
          <label className="form-field full-field">Telefon yoki email <span>*</span><input name="contact" required maxLength="100" value={form.contact} onChange={handleChange} placeholder="+998 90 123 45 67 yoki email@kompaniya.uz" /></label>
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="form-submit-row"><p><span>*</span> Majburiy maydonlar</p><button className="button button-primary" type="submit">{editingJob ? 'O‘zgarishlarni saqlash' : 'E’lonni joylash'} <span aria-hidden="true">→</span></button></div>
      </form>
    </div></section>
  );
}
