import { CaseStudyLayout } from '../../components/CaseStudyLayout';
import { caseStudies } from '../../data/caseStudyData';

const study = caseStudies.find(s => s.slug === 'technical-seo-rebuild')!;

export default function FPX() {
  return <CaseStudyLayout study={study} />;
}
