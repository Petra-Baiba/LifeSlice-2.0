import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Activity, TimePeriod } from './types';
import { LandingPage } from './components/LandingPage';
import { MainApp } from './components/MainApp';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<MainApp />} />
    </Routes>
  );
}

export default App;