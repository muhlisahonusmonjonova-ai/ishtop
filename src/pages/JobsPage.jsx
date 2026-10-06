import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import JobCard from '../components/JobCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import { CITIES } from '../data/jobs.js';

const FILTER_CATEGORIES = ['IT', 'Savdo', 'Marketing', 'Dizayn', 'Ta’lim', 'Logistika'];

export default function JobsPage({ jobs }) {
  const [params] = useSearchParams();
  const [queryInput, setQueryInput] = useState(params.get('q') || '');
  const [query, setQuery] = useState(params.get('q') || '');
  const [city, setCity] = useState(params.get('city') || '');
  const [category, setCategory] = useState(params.get('category') || '');
  const [salary, setSalary] = useState(params.get('salary') || '');

  const filteredJobs = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('uz');
    return [...jobs]
      .filter((job) => !normalizedQuery || `${job.title} ${job.company} ${job.category}`.toLocaleLowerCase('uz').includes(normalizedQuery))
      .filter((job) => !city || job.city === city)
      .filter((job) => !category || job.category === category)
      .filter((job) => !salary || (salary === 'under-5' ? job.salary < 5000000 : salary === '5-10' ? job.salary >= 5000000 && job.salary < 10000000 : job.salary >= 10000000))
      .sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
  }, [jobs, query, city, category, salary]);

  function clearFilters() {
    setQueryInput('');
    setQuery('');
    setCity('');
    setCategory('');
    setSalary('');
  }

  return (
    <div className="listing-page">
      <section className="listing-banner"><div className="container"><p className="eyebrow">KEYINGI QADAMINGIZ SHU YERDA</p><h1>Sizga mos ishni toping</h1><p>O‘zingizga yoqqan imkoniyatni tanlang va yangi karyerangiz sari qadam qo‘ying.</p><SearchBar compact query={queryInput} city={city} onQueryChange={setQueryInput} onCityChange={setCity} onSearch={({ query: nextQuery, city: nextCity }) => { setQuery(nextQuery); setCity(nextCity); }} /></div></section>
      <section className="section jobs-section">
        <div className="container">
          <div className="listing-heading"><div><h2>Barcha ishlar</h2><p>{filteredJobs.length} ta e’lon topildi</p></div><button className="clear-filters" type="button" onClick={clearFilters}>Filtrlarni tozalash ↺</button></div>
          <div className="jobs-layout">
            <aside className="filters-panel">
              <h3>Filtrlar</h3>
              <label className="filter-label">Kategoriya<select value={category} onChange={(event) => setCategory(event.target.value)}><option value="">Barcha kategoriyalar</option>{FILTER_CATEGORIES.map((item) => <option key={item}>{item}</option>)}</select></label>
              <label className="filter-label">Shahar<select value={city} onChange={(event) => setCity(event.target.value)}><option value="">Barcha shaharlar</option>{CITIES.map((item) => <option key={item}>{item}</option>)}</select></label>
              <label className="filter-label">Maosh<select value={salary} onChange={(event) => setSalary(event.target.value)}><option value="">Barcha maoshlar</option><option value="under-5">5 mln gacha</option><option value="5-10">5–10 mln</option><option value="over-10">10 mln+</option></select></label>
            </aside>
            <div className="jobs-results">
              {filteredJobs.length ? <div className="job-grid">{filteredJobs.map((job) => <JobCard key={job.id} job={job} />)}</div> : <div className="empty-state"><span className="empty-icon">⌕</span><h3>Ish e’lonlari topilmadi</h3><p>Boshqa so‘z yoki filtrlar bilan qayta qidirib ko‘ring.</p><button className="button button-secondary" type="button" onClick={clearFilters}>Filtrlarni tozalash</button></div>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
