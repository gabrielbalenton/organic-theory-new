import { CaseStudyLayout } from '../../components/CaseStudyLayout';
import { caseStudies } from '../../data/caseStudyData';

const study = caseStudies.find(s => s.slug === 'headless-gm')!;

export default function HeadlessGM() {
  return <CaseStudyLayout study={study} />;
}
