import { Form, Row, Col, Container, Button, Tab, Card, Nav, Dropdown } from "react-bootstrap";

export function CaseDetails() {
    return (<Container className=" p-4">

        <Form>

            <Col>
                <Form.Label column={true}>Case Summary</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Case Summary" />
            </Col>
            <Row>
                <Col>
                    <Form.Label column={true}>Start Date:</Form.Label>
                    <Form.Control type="date" placeholder="Start Date" />
                </Col>
                <Col>
                    <Form.Label column={true}>Predicted End Date:</Form.Label>
                    <Form.Control type="date" placeholder="Predicted End" />
                </Col>
                <Col>
                    <Form.Label column={true}>Actual End Date:</Form.Label>
                    <Form.Control type="text" placeholder="Actual End" />
                </Col>
            </Row>
            <br />

            <p className="align-right">Last updated: 12/03/2023 14:12 by ABC</p>
            <Row>
                <Col>
                    <Button className={`float-end`}>✏️ Edit</Button>
                    <Button className={`float-end`}>📄 Add</Button>

                </Col>

            </Row>
        </Form></Container>)
}


export function DocumentList() {
    return (
        <Container className="shadow p-2">
            <Row className="p-2"><Col><Button>📥 Upload Document</Button></Col>
                <Col>        <Dropdown>
                    <Dropdown.Toggle variant="success" className="float-end" id="dropdown-basic">
                        Document Type
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown></Col>
            </Row>


            <Row>
                <Col>
                    <Card>
                        <Row className="p-3">
                            <Container >
                                <h2>Some info</h2>
                                <p>Some other info</p>
                                <Row>
                                    <Col><Button>👀 View </Button> <Button>❌ Delete</Button> <Button>ℹ️ Info</Button></Col>
                                </Row>

                            </Container>

                        </Row>

                    </Card></Col>
                <Col>
                    <Card>
                        <Row className="p-3">
                            <Container >
                                <h2>Some info</h2>
                                <p>Some other info</p>
                                <Row>
                                    <Col><Button>👀 View </Button> <Button>❌ Delete</Button> <Button>ℹ️ Info</Button></Col>
                                </Row>

                            </Container>

                        </Row>

                    </Card></Col>
                <Col>
                    <Card>
                        <Row className="p-3">
                            <Container >
                                <h2>Some info</h2>
                                <p>Some other info</p>
                                <Row>
                                    <Col><Button>👀 View </Button> <Button>❌ Delete</Button> <Button>ℹ️ Info</Button></Col>
                                </Row>

                            </Container>

                        </Row>

                    </Card></Col>
            </Row>
            <br />
            <Button size="sm" >⬅️</Button> 1/10 <Button size="sm">➡️</Button>
        </Container>
    )
}

export function NoteList() {
    return (<Tab.Container defaultActiveKey="p1">
        <Container>
            <Row>
                <Col sm={3} id="selector" className={`shadow p-2`} >
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="p1">Note 1</Nav.Link>

                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="p2">Note 2</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="p3">Note 3</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="p4">Note 4</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="p5">Note 5</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="p6">Note 6</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="p7">Note 7</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <br />
                            <Button size="sm" >⬅️</Button> 1/10 <Button size="sm">➡️</Button>
                            <Button size="sm" className="float-end">📄</Button>
                            <br /><br />

                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="p1">
                            <Container className="p-3 pb-5">
                                <h2> Spoken to Local Authority </h2>
                                <h3> <span className="bold">Date:</span> 12/03/2023 22:27:33</h3>
                                <h3> <span className="bold">Involved:</span> xyz abc, bde fgh</h3>

                                <h3> <span className="bold">Note details:</span></h3>
                                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque orci sed magna gravida suscipit. Donec risus diam, vestibulum ut pulvinar aliquam, tincidunt in odio. Sed dapibus tincidunt orci, eu consequat arcu venenatis vel. Pellentesque vestibulum lorem ut vestibulum varius. Praesent id enim cursus, consectetur nibh vel, molestie leo. Vestibulum nulla justo, mattis id felis sed, ornare eleifend elit. Vestibulum aliquam nibh sed augue fringilla, quis volutpat ipsum facilisis. Integer arcu dolor, luctus non scelerisque at, molestie vitae magna. Sed ac urna orci. Donec in neque nec sem elementum dictum sed sed enim. Praesent vitae auctor justo. </p>
                                <h3> <span className="bold">Action plan:</span></h3>
                                <p>                            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque orci sed magna gravida suscipit. Donec risus diam, vestibulum ut pulvinar aliquam, tincidunt in odio. Sed dapibus tincidunt orci, eu consequat arcu venenatis vel. Pellentesque vestibulum lorem ut vestibulum varius. Praesent id enim cursus, consectetur nibh vel, molestie leo. Vestibulum nulla justo, mattis id felis sed, ornare eleifend elit. Vestibulum aliquam nibh sed augue fringilla, quis volutpat ipsum facilisis. Integer arcu dolor, luctus non scelerisque at, molestie vitae magna. Sed ac urna orci. Donec in neque nec sem elementum dictum sed sed enim. Praesent vitae auctor justo. </p>
                                </p>
                                <Button size="sm" className="float-end">Flag as Important</Button>
                                <Button size="sm" className="float-end mx-2">Mark to Modify</Button>

                            </Container>
                        </Tab.Pane>
                        <Tab.Pane eventKey="p2">
                            <Container className="p-3"><p> Test </p></Container>
                        </Tab.Pane>
                        <Tab.Pane eventKey="p3">
                            <Container className="p-3"><p> Test </p></Container>
                        </Tab.Pane>
                        <Tab.Pane eventKey="p4">
                            <Container className="p-3"><p> Test </p></Container>
                        </Tab.Pane>
                        <Tab.Pane eventKey="p5">
                            <Container className="p-3"><p> Test </p></Container>
                        </Tab.Pane>
                        <Tab.Pane eventKey="p6">
                            <Container className="p-3"><p> Test </p></Container>
                        </Tab.Pane>
                        <Tab.Pane eventKey="p7">
                            <Container className="p-3"><p> Test </p></Container>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Container>
    </Tab.Container>)
}