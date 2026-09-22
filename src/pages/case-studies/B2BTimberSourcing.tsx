import { CaseStudyLayout } from '../../components/CaseStudyLayout';
import { caseStudies } from '../../data/caseStudyData';

const study = caseStudies.find(s => s.slug === 'b2b-timber-sourcing')!;

export default function B2BTimberSourcing() {
  return <CaseStudyLayout study={study} />;
}
