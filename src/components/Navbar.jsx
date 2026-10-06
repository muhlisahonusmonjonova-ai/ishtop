import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link className="brand" to="/" aria-label="IshTop bosh sahifasi">
          <span className="brand-mark">i</span><span>IshTop</span>
        </Link>
        <nav className="main-nav" aria-label="Asosiy navigatsiya">
          <NavLink to="/jobs">Ish topish</NavLink>
          <NavLink to="/my-jobs">Mening e’lonlarim</NavLink>
        </nav>
        <div className="nav-actions">
          <Link className="nav-profile" to="/profile">Profil</Link>
          <Link className="button button-primary nav-post" to="/post-job">+ E’lon berish</Link>
        </div>
      </div>
    </header>
  );
}
