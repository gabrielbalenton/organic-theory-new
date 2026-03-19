/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// 1. STRATEGIC SOLVE: Code-splitting into page-specific chunks
// This directly addresses the "Reduce unused JavaScript" Lighthouse warning.
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Work = lazy(() => import('./pages/Work'));
const Contact = lazy(() => import('./pages/Contact'));

// 2. PERFORMANCE: Minimalist fallback UI to prevent Layout Shift
const PageLoader = () => <div className="min-h-screen bg-[#09090B]" />;

export default function App() {
  return (
    <BrowserRouter>
      {/* Suspense handles the 'wait time' between chunk downloads */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Layout acts as the Wrapper; all children render inside its <Outlet /> */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="vault" element={<Work />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}