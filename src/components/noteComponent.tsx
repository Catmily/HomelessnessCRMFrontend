import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import StandardLayout from "../layouts/standardLayout";
import SimpleMdeReact from "react-simplemde-editor";
import { Options } from "easymde";
import "easymde/dist/easymde.min.css";
import { getPersonId } from "../glue/Auth";
import { useParams } from "react-router-dom";
import {
  AddNote,
  AddSafeguardingNote,
  GetUserProfile,
} from "../glue/DBConnector";
import SearchPerson from "./searchFunction";

type Props = {
  safeguarding: boolean;
};

export const NoteComponent = ({ safeguarding }: Props) => {
  const [note, setNote] = useState("");
  const [action, setAction] = useState("");
  const [person, setPerson] = useState(Object);
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(Number);
  const [priorityDesc, setPriorityDesc] = useState("Select Priority");

  let [changed, setChanged] = useState(false);

  let { id } = useParams();
  useEffect(() => {
    const func = async () => {
      //@ts-ignore
      const res = await GetUserProfile(id);
      //@ts-ignore

      setPerson(res["data"]["message"]["0"]);
    };
    func();
  }, []);

  useEffect(() => {
    const func = async () => {
      const case_worker_id = getPersonId();
      const res = await AddNote({
        person_id: id,
        case_worker_id: case_worker_id,
        note: note,
        title: title,
        actions_to_take: action,
        actions_taken: "",
        note_date: new Date().toISOString(),
        incident_date: date,
        priority: priority,
      });

      if (safeguarding) {
        AddSafeguardingNote({
          //@ts-ignore
          note_id: res["data"]["row_id"],
          person_id: id,
        });
      }
    };
    if (setChanged) {
      func();
      changed = false;
    }
  }, [changed]);

  const options = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: true,
      lineNumbers: true,
      placeholder: "Type your note here",
    } as Options;
  }, []);

  const onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDate(new Date(value).toISOString());
  };

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTitle(value);
  };

  const onChangeNote = useCallback((value: string) => {
    setNote(value);
  }, []);

  const onChangeAction = useCallback((value: string) => {
    setAction(value);
  }, []);

  function changePriority(priority: number) {
    setPriorityDesc(`Priority: ${priority}`);
    setPriority(priority);
  }

  function addNote() {
    setChanged(true);
  }

  return (
    <Form className="my-4">
      <Col>
        <h2>User: {person["preferred_name"]}</h2>
        <Button className="" href={`/profile/${person["person_id"]}`}>
          Return to Client
        </Button>
        <br />
        <br />

        <h2>Title</h2>
        <Form.Control
          type="text"
          maxLength={50}
          placeholder="Enter the title..."
          onChange={onChangeTitle}
        />
        <br />
        <h2>Information:</h2>
        <SimpleMdeReact
          onChange={onChangeNote}
          value={note}
          options={options}
        />

        <h2>Actions to take:</h2>

        <SimpleMdeReact
          onChange={onChangeAction}
          value={action}
          options={options}
        />
      </Col>
      <Row>
        <Col>
          <Form.Label column={true}>Date:</Form.Label>
          <Form.Control
            type="date"
            onChange={onChangeDate}
            placeholder="Start Date"
          />
        </Col>
        <Col>
          <Form.Label column={true}>People involved:</Form.Label>
          <SearchPerson staffOnly={false} />
        </Col>
        <Col>
          <Form.Label column={true}>Urgency:</Form.Label>
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              className="w-100"
              id="dropdown-basic"
            >
              {priorityDesc}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                className="bold"
                name="priority_0"
                onClick={() => {
                  changePriority(0);
                }}
              >
                Life at Risk (0)
              </Dropdown.Item>
              <Dropdown.Item
                className="bold"
                name="priority_1"
                onClick={() => {
                  changePriority(1);
                }}
              >
                Urgent (1)
              </Dropdown.Item>
              <Dropdown.Item
                className="bold"
                name="priority_2"
                onClick={() => {
                  changePriority(2);
                }}
              >
                High (2)
              </Dropdown.Item>
              <Dropdown.Item
                name="priority_3"
                onClick={() => {
                  changePriority(3);
                }}
              >
                Medium (3)
              </Dropdown.Item>
              <Dropdown.Item
                name="priority_4"
                onClick={() => {
                  changePriority(4);
                }}
              >
                Low (4)
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <br />

      <Row>
        <Col>
          <Button size="lg" variant="danger" onClick={() => addNote()}>
            📥 Submit Form
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
