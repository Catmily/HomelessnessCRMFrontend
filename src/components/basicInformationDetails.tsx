import { Container, Row, Col, Button, Form } from "react-bootstrap";

export default function BasicInformationDetails() {
    return (<Container className={`p-4 main-content shadow mt-4 mb-4`}>
    <Container>
        <Row>
            <Col>
                <h1>Profile - `user`</h1>
            </Col>
            <Col>
                <Button className={`float-end`}>✏️ Edit</Button>
            </Col>
        </Row>
        <Form>
            <Row>
                <Col>
                    <Form.Label column={true}>Preferred Name*</Form.Label>
                    <Form.Control type="text" placeholder="Preferred Name" />
                </Col>
                <Col>
                    <Form.Label column={true}>Full Name*</Form.Label>
                    <Form.Control type="text" placeholder="Full Name" />
                </Col>
            </Row>
        </Form>
        <Row>
            <Col>
                <Form.Label column={true}>Address</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Address" />
            </Col>
            <Col>
                <Form.Label column={true}>Pronouns</Form.Label>
                <Form.Control type="text" placeholder="Pronouns" />
                <Form.Label column={true}>Postcode</Form.Label>
                <Form.Control type="text" placeholder="Postcode" />
            </Col>
            <Col>
                <Form.Label column={true}>Language</Form.Label>
                <Form.Control type="text" placeholder="Postcode" />
                <Form.Label column={true}>Date of Birth</Form.Label>
                <Form.Control type="date" name='date_of_birth' placeholder="Date of Birth" />

            </Col>

        </Row>
        <Row>
            <Col>
                <Form.Label column={true}>Notes</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Notes" />
            </Col>
            <Col>
                <Form.Label column={true}>Email Address</Form.Label>
                <Form.Control type="text" placeholder="Email address" />

            </Col>
            <Col>
                <Form.Label column={true}>Phone Number</Form.Label>
                <Form.Control type="text" placeholder="Phone Number" />
                <br></br>
                <Button className={`float-end w-100`}>⚠️ View Sensitive Information</Button>
            </Col>
        </Row>
    </Container>
    </Container>)
}