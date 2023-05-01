import { Card } from 'react-bootstrap';
import { isoToDate } from '../glue/Other';

interface Props {
  name: string
  caseId: string
  dateActive: string
  dateProposedEnd?: string
  dateEnd?: string
  summary: string
}

// Render cards when staff are shown cases
export default function CaseCardComponent ({
  name,
  caseId,
  dateActive,
  summary
}: Props) {
  return (
    <Card className='card-dark p-3 w-50'>
      <a href={`/case/${caseId}`}>
        <Card.Title>
          <h2>{name}</h2>
          <h4>Case started: {isoToDate(dateActive)}</h4>
        </Card.Title>
        <p>{summary.substring(0, 150)}</p>
      </a>
    </Card>
  );
}
