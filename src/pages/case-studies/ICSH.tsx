import { CaseStudyLayout } from '../../components/CaseStudyLayout';
import { caseStudies } from '../../data/caseStudyData';

const study = caseStudies.find(s => s.slug === 'icsh')!;

export default function ICSH() {
  return <CaseStudyLayout study={study} />;
}
