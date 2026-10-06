import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Link className="brand footer-brand" to="/"><span className="brand-mark">i</span><span>IshTop</span></Link>
        <p>O‘z ishingizni toping. Karyerangizni bugun boshlang.</p>
        <span>© {new Date().getFullYear()} IshTop</span>
      </div>
    </footer>
  );
}
