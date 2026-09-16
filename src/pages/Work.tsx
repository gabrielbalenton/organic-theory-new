import { Helmet } from 'react-helmet-async';
import { portfolioData } from '../data/portfolioData';
import { CaseStudyFlipStack } from '../components/ui/case-study-flip-stack';

const CARD_BACKGROUNDS = ['#F5F0EB', '#17171B', '#232329', '#101013'];
const CARD_FOREGROUNDS = ['#09090B', '#FAFAFA', '#FAFAFA', '#FAFAFA'];

export default function Work() {
  const items = portfolioData.map((project, index) => ({
    number: project.id,
    eyebrow: project.client,
    title: project.title,
    description: project.description + ' ' + project.metrics.join(' · '),
    image: project.image,
    imageAlt: project.alt,
    background: CARD_BACKGROUNDS[index % CARD_BACKGROUNDS.length],
    foreground: CARD_FOREGROUNDS[index % CARD_FOREGROUNDS.length],
    href: project.slug,
  }));

  return (
    <>
      <Helmet>
        <title>Case Studies | Real Results | Organic Theory</title>
        <meta name="description" content="Real results from real builds. Search visibility from 0 to 63%, Lighthouse SEO score of 100, 1,281 pages deployed. See the work." />
        <meta property="og:title" content="Case Studies | Organic Theory" />
        <meta property="og:url" content="https://organic-theory.vercel.app/case-studies" />
        <link rel="canonical" href="https://organic-theory.vercel.app/case-studies" />
      </Helmet>

      <CaseStudyFlipStack
        items={items}
        hint="Scroll through the work"
        heading="Systems that moved the number."
        endLabel="Built. Measured. Proven."
      />
    </>
  );
}
