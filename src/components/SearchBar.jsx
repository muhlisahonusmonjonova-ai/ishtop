import React from 'react';
import { CITIES } from '../data/jobs.js';

export default function SearchBar({
  compact = false,
  query,
  city,
  onQueryChange,
  onCityChange,
  onSearch,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    onSearch({ query: query.trim(), city });
  }

  return (
    <form className={`search-form${compact ? ' search-form-compact' : ''}`} onSubmit={handleSubmit}>
      <label className="search-field">
        <span className="field-icon" aria-hidden="true">⌕</span>
        <span className="sr-only">Kasb yoki ish nomi</span>
        <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Kasb yoki ish nomini kiriting" />
      </label>
      <label className="search-field city-field">
        <span className="field-icon" aria-hidden="true">⌖</span>
        <span className="sr-only">Shaharni tanlang</span>
        <select value={city} onChange={(event) => onCityChange(event.target.value)}>
          <option value="">Barcha shaharlar</option>
          {CITIES.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </label>
      <button className="button button-primary search-button" type="submit">Ish qidirish <span aria-hidden="true">→</span></button>
    </form>
  );
}
