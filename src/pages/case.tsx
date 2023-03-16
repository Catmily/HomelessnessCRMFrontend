import { Button, Card, Col, Container, Form, Nav, Row, Tab } from "react-bootstrap";
import Footer from "../components/footer";
import { NoteList, CaseDetails, DocumentList } from "../components/caseDetails";

import HomepageLayout from "../layouts/homepageLayout";
import StandardLayout from "../layouts/standardLayout";
import SearchBar from "../components/searchBar";

export default function Case() {
    return (
        <StandardLayout content={
            <Container className={`p-4 main-content shadow mt-4 mb-4`}>
                <h1>Case Management - `user`</h1> <Button size="sm" href="/profile">Go to Client Profile</Button>
                <Button size="sm" className="mx-2">Go to Search</Button><Button size="sm">Make Safeguarding Note</Button>

                <Container className="my-4 ">
                    <Tab.Container defaultActiveKey="p1">
                        <Row>
                            <Row id="selector" className={`shadow p-2`} >
                                <Nav variant="pills">
                                    <Nav.Item>
                                        <Nav.Link eventKey="p1">Overview</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="p2">Case Details</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="p3">Notes</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="p4">Documents</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="#" href="https://google.com">Case Worker</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="p7">Misc</Nav.Link>
                                    </Nav.Item>

                                </Nav>
                            </Row>

                            <Row className="mt-3">
                                <Tab.Content>
                                    <Tab.Pane eventKey="p1">
                                        <Card className={`card-dark shadow`}>
                                            <Container className={`shadow p-3`}>
                                                <h1>Overview</h1></Container>
                                        </Card>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="p2">
                                        <Card className={`card-dark shadow`}>
                                            <Container className={`shadow p-3`}>
                                                <h1>Case Details</h1></Container>
                                            <CaseDetails />
                                        </Card>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="p3">
                                        <Card className={`card-dark shadow`}>
                                            <Container className={`shadow p-3`}>
                                                <h1>Notes</h1>
                                                <Row className="mt-3">
                                                <SearchBar />
                            
                            </Row>
                                                </Container>
                                            <NoteList />
                                        </Card>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="p4">
                                        <Card className={`card-dark shadow`}>
                                            <Container className={`shadow p-3`}>
                                                <h1>Documents</h1>
                                                <Row className="mt-3">
                                <SearchBar />
                            
                            </Row>
                                                
                                                </Container>
                                            <DocumentList />
                                        </Card>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="p7">
                                        <Card className={`card-dark shadow`}>
                                            <Container className={`shadow p-3`}>
                                                <Button>Export Profile</Button>
                                                <Button className="mx-2">Mark for Deletion</Button>
                                                </Container>
                                        </Card>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Row>
                        </Row>
                    </Tab.Container>
                </Container></Container>} />)
}
