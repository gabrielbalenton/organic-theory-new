import { CaseStudyLayout } from '../../components/CaseStudyLayout';
import { caseStudies } from '../../data/caseStudyData';

const study = caseStudies.find(s => s.slug === 'b2b-timber-merchant')!;

export default function B2BTimberMerchant() {
  return <CaseStudyLayout study={study} />;
}
