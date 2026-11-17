import { CaseStudyLayout } from '../../components/CaseStudyLayout';
import { caseStudies } from '../../data/caseStudyData';

const study = caseStudies.find(s => s.slug === 'crm-marketing-automation')!;

export default function CRMAutomation() {
  return <CaseStudyLayout study={study} />;
}
