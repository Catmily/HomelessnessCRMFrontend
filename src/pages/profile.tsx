import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import BasicInformationDetails from "../components/basicInformationDetails";
import CardBlock from "../components/cardBlock";
import Footer from "../components/footer";
import HomepageLayout from '../layouts/homepageLayout';
import StandardLayout from '../layouts/standardLayout';

export function Profile() {
    return (
        
            <StandardLayout content={

            <><BasicInformationDetails />
                <Container className="p-0 mt-4 mb-4">
                    <Row>
                        <Col>
                            <CardBlock />
                        </Col>
                        <Col>
                        <CardBlock />
                            {/* <Container className={`p-5 supplementary-content shadow mt-4 mb-4`}>
                                <Row>
                                    <Col>
                                        <h2>⚠️ Safeguarding Alerts</h2></Col>
                                    <Col>
                                        <Button className={`float-end mx-2`}>View More</Button>
                                        <Button className={`float-end`}>Add</Button></Col>
                                </Row>
                                <Card className={`card-dark my-2 shadow`}>
                                    <Card.Body>
                                        <Row>
                                            <Col lg={15}>
                                                <Card.Title>12/03/2023 00:43 | Incident at Housing Provider</Card.Title>
                                                Urgency: HIGH<br></br>
                                                Involved: John Smith, Bob Ross
                                            </Col>
                                            <Col>
                                                <Button className={`float-end`}>View</Button>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Container> */}
                        </Col>
                    </Row>
        </Container ></>}/>)}

