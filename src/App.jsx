import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import JobsPage from './pages/JobsPage.jsx';
import JobDetailPage from './pages/JobDetailPage.jsx';
import PostJobPage from './pages/PostJobPage.jsx';
import MyJobsPage from './pages/MyJobsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import { loadJobs, loadProfile, saveJobs, saveProfile } from './data/jobs.js';

export default function App() {
  const [jobs, setJobs] = useState(loadJobs);
  const [profile, setProfile] = useState(loadProfile);

  useEffect(() => {
    saveJobs(jobs);
  }, [jobs]);

  function updateProfile(nextProfile) {
    setProfile(nextProfile);
    saveProfile(nextProfile);
  }

  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage jobs={jobs} />} />
          <Route path="/jobs" element={<JobsPage jobs={jobs} />} />
          <Route path="/jobs/:jobId" element={<JobDetailPage jobs={jobs} />} />
          <Route path="/post-job" element={<PostJobPage jobs={jobs} setJobs={setJobs} />} />
          <Route path="/post-job/:jobId" element={<PostJobPage jobs={jobs} setJobs={setJobs} />} />
          <Route path="/my-jobs" element={<MyJobsPage jobs={jobs} setJobs={setJobs} />} />
          <Route path="/profile" element={<ProfilePage profile={profile} onSave={updateProfile} jobs={jobs} />} />
          <Route path="*" element={<div className="container empty-state page-empty"><span className="empty-icon">⌕</span><h2>Sahifa topilmadi</h2><p>Bu sahifa mavjud emas yoki manzil o‘zgargan.</p><Link className="button button-primary" to="/">Bosh sahifaga qaytish</Link></div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
