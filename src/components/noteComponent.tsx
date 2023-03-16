import React, { useCallback, useMemo, useState } from 'react'
import { Button, Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import StandardLayout from "../layouts/standardLayout";
import SimpleMdeReact from 'react-simplemde-editor';
import { Options } from "easymde";
import "easymde/dist/easymde.min.css";

export const NoteComponent = () => {
    const [note, setNote] = useState("");
    const [action, setAction] = useState("");

    const options = useMemo(() => {
        return {
          autofocus: true,
          spellChecker: true,
          lineNumbers: true,
          placeholder: "Type your note here",
        } as Options
      }, []);

    const onChangeNote = useCallback((value: string) => {
        setNote(value);
      }, []);


    const onChangeAction = useCallback((value: string) => {
        setAction(value);
      }, []);


return (<Form className="my-4">

<Col>
    <h2>Information:</h2> 
   <SimpleMdeReact onChange={setNote} value={note} options={options} />

   <h2>Actions to take:</h2>

   <SimpleMdeReact onChange={setAction} value={action} options={options} />

</Col>
<Row>
    <Col>
        <Form.Label column={true}>Date:</Form.Label>
        <Form.Control type="date" placeholder="Start Date" />
    </Col>
    <Col>
        <Form.Label column={true}>People involved:</Form.Label>
        <Form.Control type="text" placeholder="This will be a popout search" />
    </Col>
    <Col>
        <Form.Label column={true}>Urgency:</Form.Label>
        <Dropdown>
        <Dropdown.Toggle variant="success" className="w-100" id="dropdown-basic">
                        Priority
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item className="bold">Life at Risk (0)</Dropdown.Item>
                        <Dropdown.Item className="bold">Urgent (1)</Dropdown.Item>
                        <Dropdown.Item className="bold">High (2)</Dropdown.Item>
                        <Dropdown.Item>Medium (3)</Dropdown.Item>
                        <Dropdown.Item>Low (4)</Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>
                
    </Col>
</Row>
<br />

<Row>
    <Col>
        <Button size="lg" variant="danger">📥 Submit Form</Button>
    </Col>

</Row>
</Form>)}
