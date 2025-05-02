import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PromoDetailsPage from './pages/PromoDetailsPage';
import { PromoProvider } from './context/PromoContext';

function App() {
  return (
    <PromoProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/promo/:id" element={<PromoDetailsPage />} />
          </Route>
        </Routes>
      </Router>
    </PromoProvider>
  );
}

export default App;