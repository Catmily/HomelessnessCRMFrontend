import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Col, Dropdown, Form, Row } from 'react-bootstrap';
import SimpleMdeReact from 'react-simplemde-editor';
import { type Options } from 'easymde';
import 'easymde/dist/easymde.min.css';
import { getPersonId } from '../glue/Auth';
import { useParams } from 'react-router-dom';
import {
  AddNote,
  AddSafeguardingNote,
  GetUserProfile
} from '../glue/DBConnector';
// import SearchPerson from './searchFunction';

interface Props {
  safeguarding: boolean
}

export const NoteComponent = ({ safeguarding }: Props) => {
  const [note, setNote] = useState('');
  const [action, setAction] = useState('');
  const [person, setPerson] = useState(Object);
  const [date, setDate] = useState('');
  const [involved, setInvolved] = useState('');

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(Number);
  const [priorityDesc, setPriorityDesc] = useState('Select Priority');

  let [changed, setChanged] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    const func = async () => {
      const res = await GetUserProfile(id);

      setPerson(res['data']['message']['0']);
    };
    void func();
  }, []);

  useEffect(() => {
    const func = async (): Promise<void> => {
      if (changed) {
        try {
          const caseWorkerId = getPersonId();
          const res = await AddNote({
            person_id: id,
            case_worker_id: caseWorkerId,
            note,
            title,
            involved,
            actions_to_take: action,
            actions_taken: '',
            note_date: new Date().toISOString(),
            incident_date: date,
            priority
          });

          if (safeguarding) {
            await AddSafeguardingNote({
              note_id: res['data']['row_id'],
              person_id: id
            });
          }
        } catch (e) {
          alert('Error: Your note could not be submitted.')
        }
      }
    };
    if (setChanged) {
      void func();
      changed = false;
    }
  }, [changed]);

  const options = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: true,
      lineNumbers: true,
      placeholder: 'Type your note here'
    } satisfies Options;
  }, []);

  const onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDate(new Date(value).toISOString());
  };

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle(value);
  };

  const onChangeInvolved = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInvolved(value);
  };

  const onChangeNote = useCallback((value: string) => {
    setNote(value);
  }, []);

  const onChangeAction = useCallback((value: string) => {
    setAction(value);
  }, []);

  function changePriority (priority: number) {
    setPriorityDesc(`Priority: ${priority}`);
    setPriority(priority);
  }

  function addNote () {
    setChanged(true);
  }

  return (
    <Form className='my-4'>
      <Col>
        <h2>User: {person['preferred_name']}</h2>
        <Button className='' href={`/profile/${person['person_id']}`}>
          Return to Client
        </Button>
        <br />
        <br />

        <h2>Title</h2>
        <Form.Control
          type='text'
          aria-label='Title'
          maxLength={50}
          placeholder='Enter the title...'
          onChange={onChangeTitle}
        />
        <br />
        <h2 >Information:</h2>
        <SimpleMdeReact
          aria-label='Information - Textbox'
          onChange={onChangeNote}
          value={note}
          options={options}
        />
        <h2>Actions to take:</h2>
        <SimpleMdeReact
          aria-label='Actions - Textbox'
          onChange={onChangeAction}
          value={action}
          options={options}
        />
      </Col>
      <Row>
        <Col>
          <Form.Label htmlFor='date' column>Date:</Form.Label>
          <Form.Control
            id='date'
            type='date'
            aria-label='Date'
            onChange={onChangeDate}
            placeholder='Start Date'
          />
        </Col>
        <Col>
          <Form.Label column htmlFor='involved'>People involved:</Form.Label>
          <Form.Control
            id='involved'
            onChange={onChangeInvolved}
            type='text'
            placeholder='Who was involved?'
            />
        </Col>
        <Col>
          <Form.Label column htmlFor='dropdown-basic' aria-label='Urgency dropdown'>Urgency:</Form.Label>
          <Dropdown>
            <Dropdown.Toggle
              variant='success'
              className='w-100'
              id='dropdown-basic'
            >
              {priorityDesc}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                className='bold'
                name='priority_0'
                onClick={() => {
                  changePriority(0);
                }}
              >
                Life at Risk (0)
              </Dropdown.Item>
              <Dropdown.Item
                className='bold'
                name='priority_1'
                onClick={() => {
                  changePriority(1);
                }}
              >
                Urgent (1)
              </Dropdown.Item>
              <Dropdown.Item
                className='bold'
                name='priority_2'
                onClick={() => {
                  changePriority(2);
                }}
              >
                High (2)
              </Dropdown.Item>
              <Dropdown.Item
                name='priority_3'
                onClick={() => {
                  changePriority(3);
                }}
              >
                Medium (3)
              </Dropdown.Item>
              <Dropdown.Item
                name='priority_4'
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
          <Button size='lg' variant='danger' onClick={() => { addNote(); }}>
            📥 Submit Form
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
