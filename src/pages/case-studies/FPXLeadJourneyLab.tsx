import { CaseStudyLayout } from '../../components/CaseStudyLayout';
import { caseStudies } from '../../data/caseStudyData';

const study = caseStudies.find(s => s.slug === 'ai-assisted-journey-platform')!;

export default function FPXLeadJourneyLab() {
  return <CaseStudyLayout study={study} />;
}
