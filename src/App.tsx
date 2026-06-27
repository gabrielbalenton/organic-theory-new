import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Work = lazy(() => import('./pages/Work'));
const Contact = lazy(() => import('./pages/Contact'));
const DMR = lazy(() => import('./pages/case-studies/DMR'));
const FPX = lazy(() => import('./pages/case-studies/FPX'));
const ICSH = lazy(() => import('./pages/case-studies/ICSH'));
const ContentSystem = lazy(() => import('./pages/case-studies/ContentSystem'));
const Tools = lazy(() => import('./pages/Tools'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Process = lazy(() => import('./pages/Process'));
const Courses = lazy(() => import('./pages/Courses'));
const CoursePlayer = lazy(() => import('./pages/CoursePlayer'));
const About = lazy(() => import('./pages/About'));
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
            <Route path="contact" element={<Contact />} />
            <Route path="tools" element={<Tools />} />
            <Route path="insights" element={<Blog />} />
            <Route path="insights/:slug" element={<BlogPost />} />
            <Route path="about" element={<About />} />
            <Route path="process" element={<Process />} />
            <Route path="courses" element={<Courses />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/courses/:courseId/learn" element={<CoursePlayer />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
