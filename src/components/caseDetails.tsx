/* eslint-disable multiline-ternary */
import { type ReactElement, useEffect, useState } from 'react';
import {
  Form,
  Row,
  Col,
  Container,
  Button,
  Tab,
  Card,
  Nav,
  Dropdown
} from 'react-bootstrap';
import PaginationWrapper, {
  type OnChangeEventType
} from '@vlsergey/react-bootstrap-pagination';
import * as $ from 'jquery';
import {
  ChangeCase,
  GetPersonNotes,
  UploadDocument,
  GetDocuments,
  GetDocument,
  GetSafeguardingNotes,
  RemoveNote,
  RemoveDoc,
  RemoveSafeguardingNote
} from '../glue/DBConnector';
import { useNavigate } from 'react-router-dom';
import { getPersonId, isJWTSupervisor } from '../glue/Auth';
import { caseFieldType, priorityType } from '../glue/typeTranslation';
import { FiveZeroZero } from '../pages/500';

interface Props {
  caseDetails: any
  editMode: boolean
}

interface NoteProps {
  caseDetails: any
  safeguarding: boolean
}

export function CaseDetails ({ caseDetails, editMode = false }: Props): ReactElement<any, any> {
  const [caseObject, setCaseObject] = useState<any>();
  const [newCaseObject, setNewCaseObject] = useState<any>();
  const [fields, setFields] = useState<any>([]);
  const [newFields, setNewFields] = useState<any>([]);
  const [changed, setChanged] = useState<boolean>(false);
  const [formEnabled, setFormEnabled] = useState<boolean>(editMode);

  const navigate = useNavigate();

  useEffect(() => {
    const func = async (): Promise<void> => {
      setCaseObject(caseDetails);
    };
    void func();
  }, []);

  const addFields = (event: React.MouseEvent<HTMLElement>): void => {
    const name = (event.target as HTMLInputElement).name;
    const value = (event.target as HTMLInputElement).value;

    setNewFields([
      ...newFields,
      <>
        <Form.Label column>
          {
            // Give them suitable IDs when the dropdown is displayed
            // for what fields to select
            // Also, pretty type rendering
            caseFieldType[
              name.replace('_dropdown', '') as keyof typeof caseFieldType
            ]
          }
        </Form.Label>
        <Form.Control
          as='textarea'
          name={name.replace('_dropdown', '')}
          onChange={handleChange}
          rows={3}
          defaultValue={value}
        />
      </>
    ]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewCaseObject((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    if (changed) {
      const func = async () => {
        try {
          const res = await ChangeCase(newCaseObject);

          setCaseObject(newCaseObject);
          setChanged(false);
          setFields([...fields, newFields]);
          setNewFields([]);
          if (editMode) {
            const rowId = res['data']['row_id'];
            navigate(`/case/${rowId}`);
          }
        } catch (e) {
          alert('Error: Could not save your changes to the case.')
        }
      };
      void func();
    }
  }, [changed]);

  useEffect(() => {
    const func = async () => {
      if (caseObject !== undefined) {
        if (editMode) {
          setNewCaseObject(caseObject);
        }

        setFields(
          Object.entries(caseDetails).map(([key, value]) =>
            caseFieldType[key]
              ? (
                  value
                    ? (
                      // Pretty type rendering
                      <>
                        <Form.Label column htmlFor={caseFieldType[key as keyof typeof caseFieldType]}>
                          {caseFieldType[key as keyof typeof caseFieldType]}
                        </Form.Label>
                        <Form.Control
                          id={caseFieldType[key as keyof typeof caseFieldType]}
                          as='textarea'
                          onChange={handleChange}
                          rows={3}
                          defaultValue={value as string}
                  />
                      </>
                      )
                    : (
                      <></>
                      )
                )
              : (
                <></>
                )
          )
        );
      }
    };
    void func();
  }, [caseObject]);

  function filterDropdown (item: any) {
    if (caseObject) {
      if (caseObject[item[0]]) {
        return false;
      }
    }
    return true;
  }

  return (
    <Container className=' p-4'>
      <fieldset disabled={!formEnabled}>
        <Form id='case'>
          {fields}
          {newFields}

        </Form>
      </fieldset>
      <Row>
        <Col>
          {formEnabled ? (
            <>
              {' '}
              {!editMode ? (
                <Button
                  variant='danger'
                  className={'float-end mx-0'}
                  onClick={() => {
                    setFormEnabled(!formEnabled);
                    // Reset case forms using JQuery
                    // @ts-expect-error JQuery
                    $('#case')[0].reset();
                    setNewFields([]);
                  }}
                >
                  🗙 Cancel
                </Button>
              ) : (
                ''
              )}
              <Dropdown>
                <Dropdown.Toggle
                  variant='success'
                  className='float-end mx-1 me-2'
                  id='dropdown-basic'
                >
                  📄 Add Field
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {Object.entries(caseFieldType)
                    .filter(filterDropdown)
                    .map(([key, value]) => (
                      // This allows us to show appropriate fields
                      // for adding, which aren't already present,
                      // in a pretty format
                      // eslint-disable-next-line react/jsx-key
                      <Dropdown.Item
                        onClick={addFields}
                        name={key + '_dropdown'}
                      >
                        {value} {}
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown>
              <Button
                variant='danger'
                className={'float-end mx-1'}
                onClick={() => {
                  setFormEnabled(!formEnabled);

                  setChanged(true);
                }}
              >
                📥 Submit
              </Button>
            </>
          ) : (
            <Button
              className={'float-end'}
              onClick={() => {
                setFormEnabled(!formEnabled);
                setNewCaseObject(caseObject);
              }}
            >
              ✏️ Edit
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export function DocumentList ({ caseDetails }: Props) {
  const [filePath, setFilePath] = useState('');
  const [file, setFile] = useState();

  const [documents, setDocuments] = useState<unknown>();
  const [errorWhy, setErrorWhy] = useState('');

  const [pages, setPages] = useState<JSX.Element[]>([]);
  const [currentPageElements, setCurrentPageElements] = useState<JSX.Element[]>(
    []
  );
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
  const [changed, setChanged] = useState<boolean>(false);

  async function getDocuments (): Promise<void> {
    const docResponse = await GetDocuments(caseDetails['person_id']);
    setDocuments(docResponse['data']['message']);
  }

  useEffect(() => {
    void getDocuments();
  }, []);

  useEffect(() => {
    if (changed) {
      const func = async () => {
        try {
          setPages([])
          await getDocuments();
          setChanged(false);
        } catch (e) {
          setErrorWhy('Could not retrieve the case documents. Unsure why.')
        }
      };
      void func();
    }
  }, [changed]);

  useEffect(() => {
    if (documents) {
      const pages: JSX.Element[] = [];
      const entries = Object.entries(documents);

      for (let i = 0; i < entries.length; i++) {
        pages.push(
          <Card className='fileCard'>
            <Container className='p-3'>
              <h2>Title: {entries[i][1].title}</h2>
              <h3>Description: {entries[i][1].description}</h3>
              <p>Filename: {entries[i][1].filename}</p>
              <p>Date: {new Date(entries[i][1].dated).toLocaleString()}</p>

              <Row>
                <Col>
                  <Button
                    onClick={async () => {
                      await GetDocument(entries[i][1].document_id);
                    }}
                  >
                    👀 View{' '}
                  </Button>
                  <Button
                    className='mx-2'
                    onClick={async () => {
                      await RemoveDoc(entries[i][1].document_id);
                      await getDocuments();
                    }}
                  >
                    ❌ Delete
                  </Button>
                  <Button>💬 Edit</Button>
                </Col>
              </Row>
            </Container>
          </Card>
        );
      }

      setPages(pages);
    }
  }, [documents]);

  useEffect(() => {
  // Pagination related things
  // Work out how many pages, what pages to display, what is being displayed
    SetCurrentPage();
  }, [pages]);

  function handlePagination (e: OnChangeEventType) {
    const { value } = e.target;

    setCurrentPageNumber(value);
  }

  useEffect(() => {
    SetCurrentPage();
  }, [currentPageNumber]);

  function SetCurrentPage () {
    const page: JSX.Element[] = [];

    for (let i = 1; i < 10; i++) {
      page.push(pages[i + currentPageNumber * 10]);
    }
    setCurrentPageElements(page);
  }

  const uploadFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilePath(value);

    const file = event.target.files[0];
    // @ts-expect-error Type checking, but we're pretty sure they're blobs
    // of some description.
    setFile(file);
  };

  useEffect(() => {
    const func = async () => {
      // Remove file path seperators from file path
      const fileName = filePath.replace(/^.*[\\\\/]/, '');
      await UploadDocument(file, {
        title: fileName,
        description: 'No description provided.',
        filename: fileName,
        file_path: null,
        case_worker_id: getPersonId(),
        uploaded_date: new Date().toISOString(),
        dated: new Date().toISOString(),
        person_id: caseDetails['person_id']
      });

      setChanged(true);
    };

    void func();
  }, [file]);

  if (errorWhy !== '') {
    return <FiveZeroZero howToResolve={errorWhy} container={false} />
  }

  return (
    <Container className='shadow p-2'>
      <Form>
        <Form.Label htmlFor='document-file' className='m-2'>📥 Upload Document: </Form.Label>
        <Form.Control
          className='w-100 p-3'
          name='document-file'
          type='file'
          id='document-file'
          onChange={uploadFileChange}
        />
      </Form>
      <p className='p-3'>Allowed extensions are: jpg, jpeg, txt, rtf, doc, docx, webp,
        odt, ods, fodt, fods, odp, fodp, xls, xlsx,
        ppt, pptx, pdf, zip, zipx, rar, 7z, png, gif,
        mp3, wav, wma, flac, mp4, m4a, m4v, avi, webm, ogg, webp, svg</p>

      <Container className='d-flex flex-wrap'>{currentPageElements}</Container>

      <PaginationWrapper
        className='mt-3 mb-3'
        value={currentPageNumber}
        totalPages={Math.floor(pages.length / 10) + 1}
        onChange={handlePagination}
       />
      <br />
    </Container>
  );
}

export function NoteList ({ caseDetails, safeguarding }: NoteProps) {
  const [pages, setPages] = useState<JSX.Element[]>([]);
  const [pageSelectors, setPageSelectors] = useState<JSX.Element[]>([]);
  const [pageCurrentSelector, setCurrentSelector] = useState<JSX.Element[]>([]);
  const [pageCurrentSelectorCount, setPageCurrentSelectorCount] =
    useState<number>(0);
  const [errorWhy, setErrorWhy] = useState('');

  const [notes, setNotes] = useState<unknown>();

  function handlePagination (e: OnChangeEventType) {
    const { value } = e.target;

    setPageCurrentSelectorCount(value);
  }

  async function getNotes () {
    // We reuse the component on both safeguarding notes and regular notes
    try {
      let noteResponse;
      if (safeguarding) {
        noteResponse = await GetSafeguardingNotes(caseDetails['person_id']);
      } else {
        noteResponse = await GetPersonNotes(caseDetails['person_id']);
      }
      const notes = noteResponse['data']['message'];
      if (notes !== undefined) {
        // Chronological order
        setNotes(notes.reverse());
      }
    } catch (e) {
      setErrorWhy('Unable to grab notes. Unsure why.')
    }
  }

  useEffect(() => {
    void getNotes();
  }, []);

  useEffect(() => {
    SetCurrentSelectorList();
  }, [pageSelectors, pageCurrentSelectorCount]);

  function SetCurrentSelectorList (): void {
    const nav: JSX.Element[] = [];

    for (let i = 0; i < 10; i++) {
      nav.push(pageSelectors[i + pageCurrentSelectorCount * 10]);
    }
    setCurrentSelector(nav);
  }

  useEffect(() => {
    if (notes) {
      const nav: JSX.Element[] = [];
      const pages: JSX.Element[] = [];

      const entries = Object.entries(notes);

      for (let i = 0; i < entries.length; i++) {
        // To avoid conflicts we give the safeguarding ones a different ID
        nav.push(
          <Nav.Item>
            <Nav.Link eventKey={safeguarding ? `ps${i}` : `p${i}`}>
              {entries[i][1].title}
              <p>Date: {new Date(entries[i][1].note_date).toLocaleString()} </p>
              <p>Priority:{' '}
                <span className={entries[i][1].priority < 3 ? 'backgroundred red bold' : ''}>
                  {priorityType[(entries[i][1].priority) as keyof typeof priorityType]}</span>
              </p>
            </Nav.Link>
          </Nav.Item>
        );

        pages.push(
          <Tab.Pane eventKey={safeguarding ? `ps${i}` : `p${i}`}>
            <Container className='p-3'>
              <p>
                <h2> {entries[i][1].title} </h2>
                <h3>
                  {' '}
                  <span className='bold'>Date (of incident):</span>{' '}
                  {new Date(entries[i][1].incident_date).toLocaleString()}{' '}
                </h3>
                <h3>
                  {' '}
                  <span className='bold'>Date (of note):</span>{' '}
                  {new Date(entries[i][1].note_date).toLocaleString()}{' '}
                </h3>

                <h3>
                  {' '}
                  <span className='bold'>Involved:</span> {entries[i][1].involved}
                </h3>

                <h3>
                  {' '}
                  <span className={'bold'}>Priority:{ ' ' }</span>
                  <span className={entries[i][1].priority < 3 ? 'backgroundred red bold' : ''}>
                    {priorityType[(entries[i][1].priority) as keyof typeof priorityType]}</span>
                </h3>

                <h3>
                  {' '}
                  <span className='bold'>Note details:</span>
                </h3>
                <p> {entries[i][1].note} </p>
                <h3>
                  {' '}
                  <span className='bold'>Action plan:</span>
                </h3>
                <p>
                  {' '}
                  <p> {entries[i][1].actions_to_take} </p>
                </p>
              </p>
              {isJWTSupervisor()
                ? (
                  <Button
                    size='sm'
                    onClick={async () => {
                      try {
                        if (safeguarding) {
                          await RemoveSafeguardingNote(entries[i][1].note_id);
                        }
                        await RemoveNote(entries[i][1].note_id);
                        await getNotes();
                      } catch (e) {
                        alert('Error: Could not remove note.')
                      }
                    }}
                    variant='warning'
                    className='float-end mb-3 mt-3 p-2'
                >
                    🔒 Delete
                  </Button>
                  )
                : (
                  <></>
                  )}
            </Container>
          </Tab.Pane>
        );
      }

      setPageSelectors(nav);
      setPages(pages);

      SetCurrentSelectorList();
    }
  }, [notes]);

  const navigate = useNavigate();

  if (errorWhy !== '') {
    return <FiveZeroZero howToResolve={errorWhy} container={false} />
  }

  return (
    <Tab.Container defaultActiveKey={safeguarding ? 'ps0' : 'p0'}>
      <Container>
        <Row>
          <Col sm={3} id='selector' className={'shadow p-2'}>
            <Nav variant='pills' className='flex-column'>
              {pageCurrentSelector}
              <br />

              { !safeguarding ? <Button
                size='sm'
                className='float-end mt-3 mb-3'
                onClick={() => {
                  navigate(`/note/user/${caseDetails['person_id']}`);
                }}
              >
                📄 Add Note
              </Button> : <Button
                size='sm'
                className='float-end mt-3 mb-3'
                onClick={() => {
                  navigate(`/safeguarding/user/add/${caseDetails['person_id']}`);
                }}
              >
                📄 Add Safeguarding Note
              </Button>}
            </Nav>
            <PaginationWrapper
              value={pageCurrentSelectorCount}
              className='mt-3 mb-3'
              totalPages={Math.floor(pageSelectors.length / 10) + 1}
              onChange={handlePagination}
              width='100%'
             />
          </Col>
          <Col sm={9}>
            <Tab.Content>{pages}</Tab.Content>
          </Col>
        </Row>
      </Container>
    </Tab.Container>
  );
}
