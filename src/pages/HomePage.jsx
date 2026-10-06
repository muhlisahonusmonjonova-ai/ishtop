import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar.jsx';
import JobCard from '../components/JobCard.jsx';
import { CATEGORIES } from '../data/jobs.js';

const categoryIcons = { IT: '</>', Savdo: '↗', Marketing: '◎', 'Ta’lim': '▤', Dizayn: '✳', Logistika: '↔', Moliya: '∑', 'Xizmat ko‘rsatish': '♡' };

export default function HomePage({ jobs }) {
  const newestJobs = [...jobs].sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt)).slice(0, 3);
  const [queryInput, setQueryInput] = useState('');
  const [city, setCity] = useState('');
  const [search, setSearch] = useState(null);
  const searchResults = useMemo(() => {
    if (!search) return [];
    const normalizedQuery = search.query.toLocaleLowerCase('uz');
    return [...jobs]
      .filter((job) => !normalizedQuery || `${job.title} ${job.company} ${job.category}`.toLocaleLowerCase('uz').includes(normalizedQuery))
      .filter((job) => !search.city || job.city === search.city)
      .sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
  }, [jobs, search]);

  return (
    <>
      <section className="hero-section">
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="hero-kicker"><span className="status-dot" /> KEYINGI QADAMINGIZ SHU YERDA</span>
            <h1>Sizga mos ishni<br /><span>toping.</span></h1>
            <p>Yuzlab imkoniyatlar orasidan o‘zingizga mos ishni toping yoki jamoangiz uchun eng yaxshi nomzodni izlang.</p>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="visual-circle circle-one" />
            <div className="visual-circle circle-two" />
            <div className="visual-card visual-card-main"><span className="visual-icon">✦</span><div><b>Yangi imkoniyat</b><small>Bugun siz uchun</small></div><span className="visual-arrow">↗</span></div>
            <div className="visual-card visual-card-float"><span className="visual-check">✓</span><div><b>1000+</b><small>faol e’lonlar</small></div></div>
            <div className="visual-spark spark-a">✳</div><div className="visual-spark spark-b">✦</div>
          </div>
          <div className="hero-search-wrap"><SearchBar query={queryInput} city={city} onQueryChange={setQueryInput} onCityChange={setCity} onSearch={setSearch} /></div>
          <div className="hero-note"><span>✓</span> Ro‘yxatdan o‘tish shart emas <i /> <span>✓</span> Bepul e’lon joylashtiring</div>
        </div>
      </section>

      {search && <section className="section home-search-results"><div className="container">
        <div className="section-heading"><div><p className="eyebrow">SIZ UCHUN TANLANDI</p><h2>Qidiruv natijalari</h2><p className="result-count">{searchResults.length} ta e’lon topildi</p></div><button className="clear-filters" type="button" onClick={() => { setSearch(null); setQueryInput(''); setCity(''); }}>Qidiruvni tozalash ↺</button></div>
        {searchResults.length ? <div className="job-grid">{searchResults.map((job) => <JobCard key={job.id} job={job} />)}</div> : <div className="empty-state"><span className="empty-icon">⌕</span><h3>Ish e’lonlari topilmadi</h3><p>Boshqa kasb nomi yoki shahar bilan qayta qidirib ko‘ring.</p></div>}
      </div></section>}

      <section className="section categories-section">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow">O‘Z YO‘NALISHINGIZNI TOPING</p><h2>Mashhur kategoriyalar</h2></div>
            <Link className="text-link" to="/jobs">Barcha ishlar <span aria-hidden="true">→</span></Link>
          </div>
          <div className="category-grid">
            {CATEGORIES.slice(0, 6).map((category) => (
              <Link className="category-card" to={`/jobs?category=${encodeURIComponent(category)}`} key={category}>
                <span className="category-icon">{categoryIcons[category]}</span><span>{category}</span><span className="category-arrow">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section latest-section">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow">IMKONIYATLAR SIZNI KUTMOQDA</p><h2>Eng yangi ishlar</h2></div>
            <Link className="text-link" to="/jobs">Barcha e’lonlarni ko‘rish <span aria-hidden="true">→</span></Link>
          </div>
          {newestJobs.length ? <div className="job-grid">{newestJobs.map((job) => <JobCard key={job.id} job={job} />)}</div> : <p className="empty-inline">Ish e’lonlari topilmadi</p>}
        </div>
      </section>

      <section className="about-section">
        <div className="container about-inner">
          <div className="about-mark"><span className="brand-mark">i</span></div>
          <div><p className="eyebrow">ISHTOP HAQIDA</p><h2>Yaxshi ish — yangi<br />imkoniyatlar boshlanishi.</h2></div>
          <p className="about-text">IshTop — ish izlovchilar va ish beruvchilarni bir joyda uchrashtiradigan sodda platforma. O‘zingizga mos imkoniyatni toping, keyingi qadamingizni bugun qo‘ying.</p>
          <Link className="button button-dark" to="/post-job">E’lon joylashtirish <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </>
  );
}
