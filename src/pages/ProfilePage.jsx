import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProfilePage({ profile, onSave, jobs }) {
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);
  const myJobsCount = jobs.filter((job) => job.isUserPosted).length;

  function handleSubmit(event) {
    event.preventDefault();
    onSave({ name: form.name.trim(), email: form.email.trim() });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  }

  return (
    <section className="section profile-page"><div className="container profile-container">
      <div className="form-intro"><p className="eyebrow">SHAXSIY MA’LUMOTLAR</p><h1>Mening profilim</h1><p>Profil ma’lumotlaringiz faqat ushbu brauzerda saqlanadi.</p></div>
      <div className="profile-layout"><aside className="profile-card"><div className="profile-avatar">{(profile.name || 'I').trim().charAt(0).toUpperCase()}</div><h2>{profile.name || 'Foydalanuvchi'}</h2><p>{profile.email || 'Email kiritilmagan'}</p><div className="profile-stat"><span>Joylashtirilgan e’lonlar</span><strong>{myJobsCount}</strong></div><Link className="text-link" to="/my-jobs">E’lonlarimni ko‘rish →</Link></aside>
        <form className="profile-form" onSubmit={handleSubmit}><h2>Profilni tahrirlash</h2><p>Ismingiz va email manzilingizni kiriting.</p><label className="form-field">Ism<input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="Ism familiyangiz" maxLength="80" /></label><label className="form-field">Email<input type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} placeholder="sizning@email.uz" maxLength="100" /></label><div className="profile-save-row"><button className="button button-primary" type="submit">Saqlash</button>{saved && <span className="success-message" role="status">Ma’lumotlar saqlandi ✓</span>}</div></form></div>
    </div></section>
  );
}
