import { useParams } from "react-router-dom"
import StandardLayout from "../layouts/standardLayout"
import { Container } from "react-bootstrap"
import { NoteList } from "../components/caseDetails"

//@ts-ignore
export const SafeguardingAlerts = () => {
    let { id } = useParams()
    let caseNotes = {
        "person_id": id
    }
    return (<StandardLayout content={ <Container className="p-0 mt-4 mb-4">

        <h1 className="red">Safeguarding Notes</h1>
        <NoteList caseDetails={caseNotes} safeguarding={true} /></Container>
    }/>)
}