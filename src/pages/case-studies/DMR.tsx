import { CaseStudyLayout } from '../../components/CaseStudyLayout';
import { caseStudies } from '../../data/caseStudyData';

const study = caseStudies.find(s => s.slug === 'dmr')!;

export default function DMR() {
  return <CaseStudyLayout study={study} />;
}
