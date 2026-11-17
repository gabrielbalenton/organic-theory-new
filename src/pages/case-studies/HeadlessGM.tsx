import { CaseStudyLayout } from '../../components/CaseStudyLayout';
import { caseStudies } from '../../data/caseStudyData';

const study = caseStudies.find(s => s.slug === 'operations-platform')!;

export default function HeadlessGM() {
  return <CaseStudyLayout study={study} />;
}
