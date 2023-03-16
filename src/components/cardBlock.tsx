import { Container, Row, Col, Button, Card } from "react-bootstrap";

export default function CardBlock() {

return (<Container className={`p-5 supplementary-content shadow mt-4 mb-4`}>
<Row>
    <Col>
        <h2>💼 Latest Case Updates</h2></Col>
    <Col>
        <Button className={`float-end`}>View Case</Button></Col>
    <Card className={`card-dark my-2 shadow`}>
        <Card.Body>
            <Row>
                <Col lg={15}>
                    <Card.Title>12/03/2023 00:43 | Added File</Card.Title>
                    'council_letter_approval.pdf'
                </Col>
                <Col>
                    <Button className={`float-end`}>View</Button>
                </Col>
            </Row>
        </Card.Body>
    </Card>
    <Card className={`card-dark my-2 shadow`}>
        <Card.Body>
            <Row>
                <Col lg={15}>
                    <Card.Title>12/03/2023 00:43 | Added File</Card.Title>
                    'council_letter_approval.pdf'
                </Col>
                <Col>
                    <Button className={`float-end`}>View</Button>
                </Col>
            </Row>
        </Card.Body>
    </Card>
    <Card className={`card-dark my-2 shadow`}>
        <Card.Body>
            <Row>
                <Col lg={15}>
                    <Card.Title>12/03/2023 00:43 | Added File</Card.Title>
                    'council_letter_approval.pdf'
                </Col>
                <Col>
                    <Button className={`float-end`}>View</Button>
                </Col>
            </Row>
        </Card.Body>
    </Card>
</Row>

</Container>)}