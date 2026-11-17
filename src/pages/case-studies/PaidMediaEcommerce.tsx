import { CaseStudyLayout } from '../../components/CaseStudyLayout';
import { caseStudies } from '../../data/caseStudyData';

const study = caseStudies.find(s => s.slug === 'paid-media-ecommerce')!;

export default function PaidMediaEcommerce() {
  return <CaseStudyLayout study={study} />;
}
