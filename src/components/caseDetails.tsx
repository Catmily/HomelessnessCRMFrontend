import { ReactElement, useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  Container,
  Button,
  Tab,
  Card,
  Nav,
  Dropdown,
  Modal,
} from "react-bootstrap";
import PaginationWrapper, {
  OnChangeEventType,
} from "@vlsergey/react-bootstrap-pagination";
import * as $ from "jquery";
import {
  ChangeCase,
  GetPersonNotes,
  UploadDocument,
  GetDocuments,
  GetDocument,
  GetSafeguardingNotes,
  RemoveNote,
  RemoveDoc,
} from "../glue/DBConnector";
import { redirect, useNavigate } from "react-router-dom";
import { getPersonId, isJWTSupervisor } from "../glue/Auth";
import { caseFieldType } from "../glue/typeTranslation";

type Props = {
  caseDetails: any;
  editMode: boolean;
};

type NoteProps = {
  caseDetails: any;
  safeguarding: boolean;
};

export function CaseDetails({ caseDetails, editMode = false }: Props) {
  const [caseObject, setCaseObject] = useState<any>();
  const [newCaseObject, setNewCaseObject] = useState<any>();
  const [fields, setFields] = useState<JSX.Element[]>([]);
  const [newFields, setNewFields] = useState<JSX.Element[]>([]);

  const [changed, setChanged] = useState<boolean>(false);
  const [formEnabled, setFormEnabled] = useState<boolean>(editMode);

  const navigate = useNavigate();

  useEffect(() => {
    const func = async () => {
      setCaseObject(caseDetails);
    };
    func();
  }, []);

  const addFields = (event: React.MouseEvent<HTMLElement>) => {
    const name = (event.target as HTMLInputElement).name;
    const value = (event.target as HTMLInputElement).value;

    //@ts-ignore
    setNewFields([
      ...newFields,
      <>
        <Form.Label column={true}>
          {
            caseFieldType[
              name.replace("_dropdown", "") as keyof typeof caseFieldType
            ]
          }
        </Form.Label>
        <Form.Control
          as="textarea"
          name={name.replace("_dropdown", "")}
          onChange={handleChange}
          rows={3}
          defaultValue={value as string}
        />
      </>,
    ]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewCaseObject((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (changed) {
      const func = async () => {
        const res = await ChangeCase(newCaseObject);
        setCaseObject(newCaseObject);
        setChanged(false);
        //@ts-ignore
        setFields([...fields, newFields]);
        setNewFields([]);

        if (editMode) {
          const row_id = res["data"]["row_id"];
          navigate(`/case/${row_id}`);
        }
      };
      func();
    }
  }, [changed]);

  useEffect(() => {
    const func = async () => {
      if (caseObject != undefined) {
        if (editMode) {
          setNewCaseObject(caseObject);
        }

        //@ts-ignore
        setFields(
          Object.entries(caseDetails).map(([key, value]) =>
            //@ts-ignore
            caseFieldType[key] ? (
              value ? (
                <>
                  <Form.Label column={true}>
                    {caseFieldType[key as keyof typeof caseFieldType]}
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    onChange={handleChange}
                    rows={3}
                    defaultValue={value as string}
                  />
                </>
              ) : (
                <></>
              )
            ) : (
              <></>
            )
          )
        );
      }
    };
    func();
  }, [caseObject]);

  function filterDropdown(item: any) {
    if (caseObject) {
      if (caseObject[item[0]]) {
        return false;
      }
    }
    return true;
  }

  return (
    <Container className=" p-4">
      <fieldset disabled={!formEnabled}>
        <Form id="case">
          {fields}
          {newFields}

          <p className="align-right">Last updated: 12/03/2023 14:12 by ABC</p>
        </Form>
      </fieldset>
      <Row>
        <Col>
          {formEnabled ? (
            <>
              {" "}
              {!editMode ? (
                <Button
                  variant="danger"
                  className={`float-end mx-0`}
                  onClick={() => {
                    setFormEnabled(!formEnabled);
                    //@ts-ignore
                    $("#case")[0].reset();
                    setNewFields([]);
                  }}
                >
                  🗙 Cancel
                </Button>
              ) : (
                ""
              )}
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  className="float-end mx-1 me-2"
                  id="dropdown-basic"
                >
                  📄 Add Field
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {Object.entries(caseFieldType)
                    .filter(filterDropdown)
                    .map(([key, value]) => (
                      //@ts-ignore
                      <Dropdown.Item
                        onClick={addFields}
                        name={key + "_dropdown"}
                      >
                        {value} {}
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown>
              <Button
                variant="danger"
                className={`float-end mx-1`}
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
              className={`float-end`}
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

export function DocumentList({ caseDetails }: Props) {
  const [filePath, setFilePath] = useState("");
  const [file, setFile] = useState();

  const [documents, setDocuments] = useState<Object>();

  const [pages, setPages] = useState<JSX.Element[]>([]);
  const [currentPageElements, setCurrentPageElements] = useState<JSX.Element[]>(
    []
  );
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
  const [changed, setChanged] = useState<boolean>(false);

  async function getDocuments() {
    let doc_response = await GetDocuments(caseDetails["person_id"]);
    setDocuments(doc_response["data"]["message"]);
  }

  useEffect(() => {
    getDocuments();
  }, []);

  useEffect(() => {
    if (changed) {
      const func = async () => {
        let doc_response = await GetDocuments(caseDetails["person_id"]);
        setDocuments(doc_response["data"]["message"]);
        setChanged(false);
      };
      func();
    }
  }, [changed]);

  useEffect(() => {
    if (documents) {
      let pages: JSX.Element[] = [];
      let entries = Object.entries(documents);

      for (let i = 0; i < entries.length; i++) {
        pages.push(
          <Card className="fileCard">
            <Container className="p-3">
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
                    👀 View{" "}
                  </Button>
                  <Button
                    className="mx-2"
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
    SetCurrentPage();
  }, [pages]);

  function handlePagination(e: OnChangeEventType) {
    const { name, value } = e.target;

    setCurrentPageNumber(value);
  }

  useEffect(() => {
    SetCurrentPage();
  }, [currentPageNumber]);

  function SetCurrentPage() {
    let page: JSX.Element[] = [];

    for (let i = 1; i < 10; i++) {
      page.push(pages[i + currentPageNumber * 10]);
    }
    setCurrentPageElements(page);
  }

  const uploadFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilePath(value);

    const file = event.target.files[0];
    //@ts-ignore
    setFile(file);
  };

  useEffect(() => {
    const func = async () => {
      const fileName = filePath.replace(/^.*[\\\/]/, "");
      await UploadDocument(file, {
        title: fileName,
        description: "No description provided.",
        filename: fileName,
        file_path: null,
        case_worker_id: getPersonId(),
        uploaded_date: new Date().toISOString(),
        dated: new Date().toISOString(),
        person_id: caseDetails["person_id"],
      });

      setChanged(true);
    };

    func();
  }, [file]);

  return (
    <Container className="shadow p-2">
      <Form>
        <Form.Label className="m-2">📥 Upload Document: '</Form.Label>
        <Form.Control
          className="w-100 p-2"
          name="document-file"
          type="file"
          id="document-file"
          onChange={uploadFileChange}
        />
      </Form>
      <Row className="p-2">
        <Col>
          <br />
        </Col>
        <Col>
          {" "}
          <Dropdown>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Container className="d-flex flex-wrap">{currentPageElements}</Container>
      <br />
      <PaginationWrapper
        value={currentPageNumber}
        totalPages={pages.length - 1}
        onChange={handlePagination}
        size="sm"
      ></PaginationWrapper>
      <br />
    </Container>
  );
}

export function NoteList({ caseDetails, safeguarding }: NoteProps) {
  const [pages, setPages] = useState<JSX.Element[]>([]);
  const [pageSelectors, setPageSelectors] = useState<JSX.Element[]>([]);
  const [pageCurrentSelector, setCurrentSelector] = useState<JSX.Element[]>([]);
  const [pageCurrentSelectorCount, setPageCurrentSelectorCount] =
    useState<number>(0);

  const [notes, setNotes] = useState<Object>();

  function handlePagination(e: OnChangeEventType) {
    const { name, value } = e.target;

    setPageCurrentSelectorCount(value);
  }

  async function getNotes() {
    let note_response;
    if (safeguarding) {
      note_response = await GetSafeguardingNotes(caseDetails["person_id"]);
    } else {
      note_response = await GetPersonNotes(caseDetails["person_id"]);
    }
    if (note_response["data"] != undefined) {
      setNotes(note_response["data"]["message"]);
    }
  }

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    SetCurrentSelectorList();
  }, [pageSelectors, pageCurrentSelectorCount]);

  function SetCurrentSelectorList() {
    let nav: JSX.Element[] = [];

    for (let i = 1; i < 10; i++) {
      nav.push(pageSelectors[i + pageCurrentSelectorCount * 10]);
    }
    setCurrentSelector(nav);
  }

  useEffect(() => {
    if (notes) {
      let nav: JSX.Element[] = [];
      let pages: JSX.Element[] = [];

      let entries = Object.entries(notes);

      for (let i = 0; i < entries.length; i++) {
        nav.push(
          <Nav.Item>
            <Nav.Link eventKey={`p${i}`}>
              {entries[i][1].title}
              <p>Date: {new Date(entries[i][1].note_date).toLocaleString()} </p>
            </Nav.Link>
          </Nav.Item>
        );

        pages.push(
          <Tab.Pane eventKey={`p${i}`}>
            <Container className="p-3">
              <p>
                <h2> {entries[i][1].title} </h2>
                <h3>
                  {" "}
                  <span className="bold">Date (of incident):</span>{" "}
                  {new Date(entries[i][1].incident_date).toLocaleString()}{" "}
                </h3>
                <h3>
                  {" "}
                  <span className="bold">Date (of note):</span>{" "}
                  {new Date(entries[i][1].note_date).toLocaleString()}{" "}
                </h3>

                <h3>
                  {" "}
                  <span className="bold">Involved:</span> WIP
                </h3>

                <h3>
                  {" "}
                  <span className="bold">Note details:</span>
                </h3>
                <p> {entries[i][1].note} </p>
                <h3>
                  {" "}
                  <span className="bold">Action plan:</span>
                </h3>
                <p>
                  {" "}
                  <p> {entries[i][1].actions_to_take} </p>
                </p>
              </p>
              {isJWTSupervisor() ? (
                <Button
                  size="sm"
                  onClick={async () => {
                    await RemoveNote(entries[i][1].note_id);
                    await getNotes();
                  }}
                  variant="warning"
                  className="float-end mb-3 mt-3 p-2"
                >
                  🔒 Delete
                </Button>
              ) : (
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

  return (
    <Tab.Container defaultActiveKey="p1">
      <Container>
        <Row>
          <Col sm={3} id="selector" className={`shadow p-2`}>
            <Nav variant="pills" className="flex-column">
              {pageCurrentSelector}
              <br />

              <Button
                size="sm"
                className="float-end"
                onClick={() => {
                  navigate(`/note/user/${caseDetails["person_id"]}`);
                }}
              >
                📄 Add Note
              </Button>
              <br />
              <br />
            </Nav>
            <PaginationWrapper
              value={pageCurrentSelectorCount}
              totalPages={pageSelectors.length - 1}
              onChange={handlePagination}
              size="sm"
            ></PaginationWrapper>
          </Col>
          <Col sm={9}>
            <Tab.Content>{pages}</Tab.Content>
          </Col>
        </Row>
      </Container>
    </Tab.Container>
  );
}
