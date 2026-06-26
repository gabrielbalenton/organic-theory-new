import { CaseStudyLayout } from '../../components/CaseStudyLayout';
import { caseStudies } from '../../data/caseStudyData';

const study = caseStudies.find(s => s.slug === 'fpx')!;

export default function FPX() {
  return <CaseStudyLayout study={study} />;
}
