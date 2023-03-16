import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { NoteComponent } from "../components/noteComponent";
import StandardLayout from "../layouts/standardLayout";

export default function Cases() {
    return (<StandardLayout content={
        
        <Container className="p-3 main-content shadow mt-4 mb-4"><h1>Your Cases:</h1> 
                        <Button size="sm" className="mt-0 my-2">Create New Case</Button>

        <Row>
            <Col>
                <Card className="card-dark p-3">
                    <h2>👤 Ian Atkins</h2>
                    <p>Assigned since Apr 5th, 2022</p>
                </Card>
            </Col>
            <Col>
                <Card className="card-dark p-3">
                    <h2>👤 Ian Atkins</h2>
                    <p>Assigned since Apr 5th, 2022</p>
                </Card>
            </Col>
            <Col>
                <Card className="card-dark p-3">
                    <h2>👤 Ian Atkins</h2>
                    <p>Assigned since Apr 5th, 2022</p>
                </Card>
            </Col>
        </Row>
        </Container>}/>)}  