import { CaseStudyLayout } from '../../components/CaseStudyLayout';
import { caseStudies } from '../../data/caseStudyData';

const study = caseStudies.find(s => s.slug === 'fpx-lead-journey-lab')!;

export default function FPXLeadJourneyLab() {
  return <CaseStudyLayout study={study} />;
}
