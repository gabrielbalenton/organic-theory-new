import { CaseStudyLayout } from '../../components/CaseStudyLayout';
import { caseStudies } from '../../data/caseStudyData';

const study = caseStudies.find(s => s.slug === 'membership-automation')!;

export default function ICSH() {
  return <CaseStudyLayout study={study} />;
}
