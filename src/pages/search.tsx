import {
  Container,
  Form,
  Button,
  Card
} from 'react-bootstrap';
import StandardLayout from '../layouts/standardLayout';
import Table from 'react-bootstrap/Table';
import { type ReactElement, useEffect, useState } from 'react';
import {
  GetCasesGeneric,
  GetDocumentsGeneric,
  GetKeysDB,
  GetNotesGeneric,
  GetPeopleGeneric
} from '../glue/DBConnector';
import {
  caseFieldType,
  documentType,
  noteType,
  personFieldType
} from '../glue/typeTranslation';
import { isJWTCaseWorker, isJWTSupervisor } from '../glue/Auth';
import { FiveZeroZero } from './500';

export default function Search (): ReactElement<any, any> {
  const [errorWhy, setErrorWhy] = useState('');

  const [caseBox, setCaseBox] = useState(false);
  const [documentBox, setDocumentBox] = useState(false);
  const [clientBox, setClientBox] = useState(false);

  const [noteBox, setNoteBox] = useState(false);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const [searchElements, setSearchElements] = useState<unknown>({});

  // eslint-disable-next-line @typescript-eslint/ban-types
  const [searchElementChanges, setSearchElementChanges] = useState<unknown>({
    case: [],
    document: [],
    note: [],
    person: []
  });

  const [searchResultElements, setSearchResultElements] =
    useState<JSX.Element>();

  // eslint-disable-next-line @typescript-eslint/ban-types
  const [searchObjects, setSearchObjects] = useState<Object[]>();
  const [searchResultCount, setResultCount] = useState(0);

  const [submitted, setSubmitted] = useState(false);
  const isCaseWorker = isJWTCaseWorker();
  const isSupervisor = isJWTSupervisor();

  const [keys, setDBKeys] = useState(Object);

  useEffect(() => {
    if (searchObjects) {
      const caObj = searchObjects['case'];
      const noteObj = searchObjects['note'];
      const docObj = searchObjects['document'];
      const perObj = searchObjects['person'];

      const tempCase = [];
      const tempNote = [];
      const tempPerson = [];
      const tempDocument = [];
      for (const element in caObj) {
        const caseId = caObj[element].case_id;

        // To clarify 'unknown as string', this is because
        // It's a request coming in from somewhere (so no type), but we can't
        // just turn it into a string directly

        tempCase.push(
          <tr>
            <td>Case (ID: {caseId})</td>
            <td>{caObj[element].date}</td>
            <td>ID: {caObj[element].person}</td>
            <td>{caObj[element].summary}</td>
            <td>
              <a
                href={
                  (`/case/${caseId}`) as unknown as string
                }
              >
                Link (to person case)
              </a>
            </td>
          </tr>
        );
      }
      for (const element in noteObj) {
        // We use our outer join here
        // the benefit is that we can now show both
        // safeguarding note IDs, and note IDs
        // which tells the user if they're both or one of them
        const noteId = noteObj[element][1]['note_id'];
        const personId = noteObj[element][1]['person_id'];

        let noteIdText = `Note (ID: ${noteId})`

        if (noteObj[element][0]['safeguarding_id']) {
          const safeguardingId = noteObj[element][0]['safeguarding_id'];
          noteIdText +=
            `, Safeguarding Note (ID: ${safeguardingId})`
        }

        tempNote.push(
          <tr>
            <td>{noteIdText}</td>
            <td>{noteObj[element][1].note_date}</td>
            <td>ID: {noteObj[element][1].person_id}</td>
            <td>{noteObj[element][1].title}</td>
            <td>
              <a
                href={
                  (`/profile/${personId}`) as unknown as string
                }
              >
                Link (to person profile)
              </a>
            </td>
          </tr>
        );
      }

      for (const element in docObj) {
        const documentId = docObj[element].document_id;
        const personId = docObj[element].personId;

        tempDocument.push(
          <tr>
            <td>Document (ID: {documentId})</td>
            <td>{docObj[element].date}</td>
            <td>ID: {docObj[element].person_id}</td>
            <td>{docObj[element].title}</td>
            <td>
              <a
                href={
                  (`/profile/${personId}`) as unknown as string
                }
              >
                Link (to person profile)
              </a>
            </td>
          </tr>
        );
      }
      for (const element in perObj) {
        const personId = perObj[element][1].person_id;

        let personIdText = `Person (ID: ${personId})`

        if (perObj[element][0].staff_id) {
          const staffId = perObj[element][0].staff_id;
          personIdText += `, Staff (ID: ${staffId})`
        }

        tempPerson.push(
          <tr>
            <td>{personIdText}</td>
            <td>{perObj[element][1].date}</td>
            <td>{perObj[element][1].preferred_name}</td>
            <td>DOB: {perObj[element][1].dob}</td>
            <td>
              <a
                href={
                  (`/profile/${personId}`) as unknown as string
                }
              >
                Link (to profile)
              </a>
            </td>
          </tr>
        );
      }

      const finalTemp = [].concat(
        tempCase,
        tempNote,
        tempPerson,
        tempDocument
      );

      setSearchResultElements(finalTemp as any);
      setResultCount(finalTemp.length);
    }
  }, [searchObjects]);

  useEffect(() => {
    if (submitted) {
      const func = async (): Promise<void> => {
        let peopleRes: any;
        let noteRes: any;
        let caseRes: any;
        let documentRes = null;

        try {
          if (caseBox) {
            const res = await GetCasesGeneric(searchElementChanges['case']);
            caseRes = res.data.message;
          }
          if (noteBox) {
            const res = await GetNotesGeneric(searchElementChanges['note']);
            noteRes = res.data.message;
          }
          if (clientBox) {
            const res = await GetPeopleGeneric(searchElementChanges['person']);
            peopleRes = res.data.message;
          }

          if (documentBox) {
            const res = await GetDocumentsGeneric(searchElementChanges['document']);
            documentRes = res.data.message;
          }
        } catch (e) {
          alert('Error in search. Please check your query and try again.')
        }

        // ESLint optimisation

        setSearchObjects((prevState) => ({
          ...prevState,
          case: caseRes || [],
          note: noteRes || [],
          person: peopleRes || [],
          document: documentRes || []
        }));
      };

      void func();
    }
    setSubmitted(false);
  }, [submitted]);

  const handleChangeSearchBox = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;

    // We assign IDs based off what the box is
    // All these boxes are dynamically generated
    // To allow for easier future changes of
    // fields in the DB

    const s = name.split('|');
    const type = s[1];
    const fieldName = s[0];
    if (s[2] !== 'field') {
      return;
    }

    setSearchElementChanges((prevState) => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        [fieldName]: value
      }
    }));
  };

  useEffect(() => {}, [searchElementChanges]);

  useEffect(() => {
    const func = async (): Promise<void> => {
      try {
        const res = await GetKeysDB([
          'Person',
          'Case',
          'Note',
          'Staff',
          'Document',
          'SafeguardingNotes'
        ]);
        const data = res.data.models;

        // Remove id fields - who wants to search by ID?

        for (const key in data) {
          data[key] = data[key].filter((item: string | string[]) => !item.includes('_id'));
        }
        setDBKeys(data);
      } catch (e) {
        setErrorWhy(`Cannot talk to the database to see what you can search.
      This is unlikely something you can fix yourself.`)
      }
    }
    void func();
  }, []);

  function makeBoxes (names: any, type: string): any {
    const boxes = [];
    if (type === 'case') {
      for (const name of names) {
        boxes.push(
          <div className={'d-inline-block'}>
            <Form.Label column htmlFor={`${name}|${type}|field`}>
              Case - {caseFieldType[`${name}`]}
            </Form.Label>
            <Form.Control
              type='text'
              onChange={handleChangeSearchBox}
              placeholder={
                caseFieldType[`${name}`] ? caseFieldType[`${name}`] : <></>
              }
              name={`${name}|${type}|field`}
              id={`${name}|${type}|field`}
             />
          </div>
        );
      }
    }
    if (type === 'person') {
      for (const name of names) {
        boxes.push(
          <div className={'d-inline-block'}>
            <Form.Label htmlFor={`${name}|${type}|field`}>Person - {personFieldType[`${name}`]}</Form.Label>
            <Form.Control
              type='text'
              id={`${name}|${type}|field`}
              onChange={handleChangeSearchBox}
              placeholder={
                personFieldType[`${name}`] ? personFieldType[`${name}`] : <></>
              }
              name={`${name}|${type}|field`}
             />
          </div>
        );
      }
    }

    if (type === 'note') {
      for (const name of names) {
        boxes.push(
          <div className={'d-inline-block'}>
            <Form.Label htmlFor={`${name}|${type}|field`}>Note - {noteType[`${name}`]}</Form.Label>
            <Form.Control
              type='text'
              id={`${name}|${type}|field`}
              onChange={handleChangeSearchBox}
              placeholder={noteType[`${name}`] ? noteType[`${name}`] : <></>}
              name={`${name}|${type}|field`}
             />
          </div>
        );
      }
    }
    if (type === 'document') {
      for (const name of names) {
        boxes.push(
          <div className={'d-inline-block'}>
            <Form.Label htmlFor={`${name}|${type}|field`}>Document - {documentType[`${name}`]}</Form.Label>
            <Form.Control
              id={`${name}|${type}|field`}
              type='text'
              onChange={handleChangeSearchBox}
              placeholder={
                documentType[`${name}`] ? documentType[`${name}`] : <></>
              }
              name={`${name}|${type}|field`}
             />
          </div>
        );
      }
    }
    return boxes;
  }

  useEffect(() => {}, [searchElements]);
  // Add boxes to search elements dynamically
  function setBoxes (type: string): void {
    const b = keys[type];
    setSearchElements((prevState) => ({
      ...prevState,
      [type]: makeBoxes(b, type)
    }));
  }

  if (errorWhy !== '') {
    return <FiveZeroZero howToResolve={errorWhy} container />
  }

  return (
    <StandardLayout
      content={
        <Container className={'p-4 main-content shadow mt-4 mb-4'}>
          <h1>Search</h1>
          <Form>
            <p>Search in: </p>
            <Form.Check
              id='clients_box'
              name='clients_box'
              className='mx-1 my-2'
              label='People'
              type='checkbox'
              onClick={() => {
                setClientBox(!clientBox);
                setBoxes('person');
              }}
            />

            {clientBox
              ? (
                <div className={'d-flex flex-wrap'}>
                  {searchElements['person']}
                </div>
                )
              : (
                <></>
                )}

            {isCaseWorker || isSupervisor
              ? (
                <>
                  <Form.Check
                    className='mx-1'
                    id='documents_box'
                    name='documents_box'
                    label='Documents'
                    type='checkbox'
                    onClick={() => {
                      setDocumentBox(!documentBox);
                      setBoxes('document');
                    }}
                />
                  {documentBox
                    ? (
                      <div className={'d-flex flex-wrap'}>
                        {searchElements['document']}
                      </div>
                      )
                    : (
                      <></>
                      )}

                  <Form.Check
                    id='cases_box'
                    className='mx-1 my-2'
                    name='cases_box'
                    label='Cases'
                    type='checkbox'
                    onClick={() => {
                      setCaseBox(!caseBox);
                      setBoxes('case');
                    }}
                />
                  {caseBox
                    ? (
                      <div className={'d-flex flex-wrap'}>
                        {searchElements['case']}
                      </div>
                      )
                    : (
                      <></>
                      )}

                  <Form.Check
                    id='notes_box'
                    name='notes_box'
                    className='mx-1 my-2'
                    label='Notes'
                    type='checkbox'
                    onClick={() => {
                      setNoteBox(!noteBox);
                      setBoxes('note');
                    }}
                />
                  {noteBox
                    ? (
                      <div className={'d-flex flex-wrap'}>
                        {searchElements['note']}
                      </div>
                      )
                    : (
                      <></>
                      )}
                </>
                )
              : (
                <></>
                )}

            <Button
              size='lg'
              className='my-3'
              onClick={() => {
                setSubmitted(!submitted);
              }}
            >
              📥 Submit Form
            </Button>
          </Form>
          <Card className={'card-dark shadow p-2'}>
            <h3>
              There {searchResultCount === 1 ? 'is ' : 'are '}
              {`${searchResultCount} `}
              match{searchResultCount === 1 ? '' : 'es'} for your search result.
            </h3>

            <Table id='results' striped bordered hover responsive>
              <thead>
                <tr>
                  <th>📁 Type</th>
                  <th>📅 Date</th>

                  <th>👤 Person</th>
                  <th>ℹ️ Summary or Date of Birth</th>
                  <th>🔗 Link</th>
                </tr>
              </thead>
              <tbody>{searchResultElements}</tbody>
            </Table>
          </Card>
        </Container>
      }
    />
  );
}
