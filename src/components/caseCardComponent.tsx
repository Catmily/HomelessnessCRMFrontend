import { Card } from "react-bootstrap"

type Props = {
    name: string,
    case_id: string,
    date_active: string,
    date_proposed_end?: string,
    date_end?: string,
    summary: string
}

// interface FormState {
//     [key: string]: string;
//   }

export default function CaseCardComponent({name, case_id, date_active, summary}: Props) {
    return (<Card className="card-dark p-3 w-50"><a href={`/case/${case_id}`}>
    <Card.Title><h2>{name}</h2>
    <h4>Case started: {date_active}</h4></Card.Title>
    <p>{summary.substring(0,150)}</p></a>
</Card>)
}