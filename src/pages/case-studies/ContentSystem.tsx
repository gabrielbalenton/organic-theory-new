import { CaseStudyLayout } from '../../components/CaseStudyLayout';
import { caseStudies } from '../../data/caseStudyData';

const study = caseStudies.find(s => s.slug === 'content-system')!;

export default function ContentSystem() {
  return <CaseStudyLayout study={study} />;
}
