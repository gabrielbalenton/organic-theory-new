import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Work = lazy(() => import('./pages/Work'));
const Contact = lazy(() => import('./pages/Contact'));
const DMR = lazy(() => import('./pages/case-studies/DMR'));
const FPX = lazy(() => import('./pages/case-studies/FPX'));
const ICSH = lazy(() => import('./pages/case-studies/ICSH'));
const ContentSystem = lazy(() => import('./pages/case-studies/ContentSystem'));
const HeadlessGM = lazy(() => import('./pages/case-studies/HeadlessGM'));
const B2BTimberMerchant = lazy(() => import('./pages/case-studies/B2BTimberMerchant'));
const B2BTimberSourcing = lazy(() => import('./pages/case-studies/B2BTimberSourcing'));
const Tools = lazy(() => import('./pages/Tools'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Process = lazy(() => import('./pages/Process'));
const Courses = lazy(() => import('./pages/Courses'));
const CoursePlayer = lazy(() => import('./pages/CoursePlayer'));
const About = lazy(() => import('./pages/About'));
const Start = lazy(() => import('./pages/Start'));
const Pipeline = lazy(() => import('./pages/Pipeline'));
const Pitch = lazy(() => import('./pages/Pitch'));
const FPXStocklist = lazy(() => import('./pages/FPXStocklist'));
const FPXStocklistLive = lazy(() => import('./pages/FPXStocklistLive'));
const DMRSignature = lazy(() => import('./pages/DMRSignature'));
const DMRSignatureRobby = lazy(() => import('./pages/DMRSignatureRobby'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PageLoader = () => <div className="min-h-screen bg-[#09090B]" />;

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="case-studies" element={<Work />} />
            <Route path="case-studies/dmr" element={<DMR />} />
            <Route path="case-studies/fpx" element={<FPX />} />
            <Route path="case-studies/icsh" element={<ICSH />} />
            <Route path="case-studies/content-system" element={<ContentSystem />} />
            <Route path="case-studies/headless-gm" element={<HeadlessGM />} />
            <Route path="case-studies/b2b-timber-merchant" element={<B2BTimberMerchant />} />
            <Route path="case-studies/b2b-timber-sourcing" element={<B2BTimberSourcing />} />
            <Route path="contact" element={<Contact />} />
            <Route path="tools" element={<Tools />} />
            <Route path="insights" element={<Blog />} />
            <Route path="insights/:slug" element={<BlogPost />} />
            <Route path="about" element={<About />} />
            <Route path="process" element={<Process />} />
            <Route path="courses" element={<Courses />} />
            <Route path="start" element={<Start />} />
            <Route path="pipeline" element={<Pipeline />} />
            <Route path="pipeline/jobs" element={<Navigate to="/pipeline" replace />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/courses/:courseId/learn" element={<CoursePlayer />} />
          <Route path="/pitch/:slug" element={<Pitch />} />
          <Route path="/fpx/stocklist" element={<FPXStocklistLive />} />
          <Route path="/dmr-signature" element={<DMRSignature />} />
          <Route path="/dmr-signature-robby" element={<DMRSignatureRobby />} />
          <Route path="/fpx/stocklist-classic" element={<FPXStocklist />} />
          <Route path="/fpx/stocklist-beta" element={<Navigate to="/fpx/stocklist" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}