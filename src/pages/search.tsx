import {
  Container,
  Dropdown,
  Form,
  Row,
  Col,
  Button,
  Card,
} from "react-bootstrap";
import StandardLayout from "../layouts/standardLayout";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import {
  GetCasesGeneric,
  GetDocumentsGeneric,
  GetKeysDB,
  GetNotesGeneric,
  GetPeopleGeneric,
  IsCaseWorker,
  IsSupervisor,
} from "../glue/DBConnector";
import {
  caseFieldType,
  documentType,
  noteType,
  personFieldType,
} from "../glue/typeTranslation";
import $ from "jquery";
import { isJWTCaseWorker, isJWTSupervisor } from "../glue/Auth";

export default function Search() {
  const [caseBox, setCaseBox] = useState(false);
  const [documentBox, setDocumentBox] = useState(false);
  const [clientBox, setClientBox] = useState(false);

  const [noteBox, setNoteBox] = useState(false);

  const [searchElements, setSearchElements] = useState<Object>({});

  const [searchElementChanges, setSearchElementChanges] = useState<Object>({
    case: [],
    document: [],
    note: [],
    person: [],
  });

  const [searchResultElements, setSearchResultElements] =
    useState<JSX.Element>();
  const [searchObjects, setSearchObjects] = useState<Object[]>();
  const [searchResultCount, setResultCount] = useState(0);

  const [submitted, setSubmitted] = useState(false);
  const isCaseWorker = isJWTCaseWorker();
  const isSupervisor = isJWTSupervisor();

  const [keys, setDBKeys] = useState(Object);

  //@ts-ignore

  useEffect(() => {
    if (searchObjects) {
      const ca_obj = searchObjects["case"],
        note_obj = searchObjects["note"];
      const doc_obj = searchObjects["document"],
        per_obj = searchObjects["person"];
      let tempCase = [],
        tempNote = [],
        tempPerson = [],
        tempDocument = [];
      for (let element in ca_obj) {
        tempCase.push(
          <tr>
            <td>Case (ID: {ca_obj[element]["case_id"]})</td>
            <td>{ca_obj[element]["date"]}</td>
            <td>{ca_obj[element]["person"]}</td>
            <td>{ca_obj[element]["summary"]}</td>
            <td>
              <a
                href={
                  ("/case/" + ca_obj[element]["case_id"]) as unknown as string
                }
              >
                Link (to case)
              </a>
            </td>
          </tr>
        );
      }
      for (let element in note_obj) {
        let note_id_text = "Note (ID: " + note_obj[element][1]["note_id"] + ")";

        if (note_obj[element][0]["safeguarding_id"]) {
          note_id_text +=
            ", Safeguarding Note (ID: " +
            note_obj[element][0]["safeguarding_id"] +
            ")";
        }

        tempNote.push(
          <tr>
            <td>{note_id_text}</td>
            <td>{note_obj[element][1]["note_date"]}</td>
            <td>{note_obj[element][1]["person_id"]}</td>
            <td>{note_obj[element][1]["title"]}</td>
            <td>
              <a
                href={
                  ("/profile/" +
                    note_obj[element][1]["person_id"]) as unknown as string
                }
              >
                Link (to profile)
              </a>
            </td>
          </tr>
        );
      }

      for (let element in doc_obj) {
        tempDocument.push(
          <tr>
            <td>Document (ID: {doc_obj[element]["document_id"]})</td>
            <td>{doc_obj[element]["date"]}</td>
            <td>{doc_obj[element]["person_id"]}</td>
            <td>{doc_obj[element]["title"]}</td>
            <td>
              <a
                href={
                  ("/profile/" +
                    doc_obj[element]["person_id"]) as unknown as string
                }
              >
                Link (to profile)
              </a>
            </td>
          </tr>
        );
      }
      for (let element in per_obj) {
        let person_id_text =
          "Person (ID: " + per_obj[element][1]["person_id"] + ")";
        if (per_obj[element][0]["staff_id"]) {
          person_id_text +=
            ", Staff (ID: " + per_obj[element][0]["staff_id"] + ")";
        }
        tempPerson.push(
          <tr>
            <td>{person_id_text}</td>
            <td>{per_obj[element][1]["date"]}</td>
            <td>{per_obj[element][1]["preferred_name"]}</td>
            <td>DOB: {per_obj[element][1]["dob"]}</td>
            <td>
              <a
                href={
                  ("/profile/" +
                    per_obj[element][1]["person_id"]) as unknown as string
                }
              >
                Link (to profile)
              </a>
            </td>
          </tr>
        );
      }

      const final_temp = [].concat(
        tempCase,
        tempNote,
        tempPerson,
        tempDocument
      );
      //@ts-ignore
      setSearchResultElements(final_temp);
      setResultCount(final_temp.length);
    }
  }, [searchObjects]);

  useEffect(() => {
    if (submitted) {
      const func = async () => {
        let people_res,
          note_res,
          case_res,
          document_res = null;

        if (caseBox) {
          let res = await GetCasesGeneric(searchElementChanges["case"]);
          case_res = res["data"]["message"];
        }
        if (noteBox) {
          let res = await GetNotesGeneric(searchElementChanges["note"]);
          note_res = res["data"]["message"];
        }
        if (clientBox) {
          let res = await GetPeopleGeneric(searchElementChanges["person"]);

          people_res = res["data"]["message"];
        }

        if (documentBox) {
          let res = await GetDocumentsGeneric(searchElementChanges["document"]);
          document_res = res["data"]["message"];
        }

        setSearchObjects((prevState) => ({
          ...prevState,
          case: case_res ? case_res : [],
          note: note_res ? note_res : [],
          person: people_res ? people_res : [],
          document: document_res ? document_res : [],
        }));
      };

      func();
    }
    setSubmitted(false);
  }, [submitted]);

  const handleChangeSearchBox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    const s = name.split("|");

    const type = s[1];
    const fieldName = s[0];
    if (s[2] != "field") {
      return;
    }

    setSearchElementChanges((prevState) => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        [fieldName]: value,
      },
    }));
  };

  useEffect(() => {}, [searchElementChanges]);

  //GetKeysDB()
  useEffect(() => {
    const func = async () => {
      let res = await GetKeysDB([
        "Person",
        "Case",
        "Note",
        "Staff",
        "Document",
        "SafeguardingNotes",
      ]);
      let data = res["data"]["models"];

      // remove id fields

      for (let key in data) {
        data[key] = data[key].filter((item) => !item.includes("_id"));
      }
      setDBKeys(data);
    };
    func();
  }, []);

  function makeBoxes(names, type) {
    let boxes = [];
    if (type == "case") {
      for (const name of names)
        boxes.push(
          <div className={"d-inline-block"}>
            <Form.Label column={true}>
              Case - {caseFieldType[`${name}`]}
            </Form.Label>

            <Form.Control
              type="text"
              onChange={handleChangeSearchBox}
              placeholder={
                caseFieldType[`${name}`] ? caseFieldType[`${name}`] : <></>
              }
              name={`${name}|${type}|field`}
            ></Form.Control>
          </div>
        );
    }
    if (type == "person") {
      for (const name of names)
        boxes.push(
          <div className={"d-inline-block"}>
            <Form.Label>Person - {personFieldType[`${name}`]}</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChangeSearchBox}
              placeholder={
                personFieldType[`${name}`] ? personFieldType[`${name}`] : <></>
              }
              name={`${name}|${type}|field`}
            ></Form.Control>
          </div>
        );
    }

    if (type == "note") {
      for (const name of names)
        boxes.push(
          <div className={"d-inline-block"}>
            <Form.Label>Note - {noteType[`${name}`]}</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChangeSearchBox}
              placeholder={noteType[`${name}`] ? noteType[`${name}`] : <></>}
              name={`${name}|${type}|field`}
            ></Form.Control>
          </div>
        );
    }
    if (type == "document") {
      for (const name of names)
        boxes.push(
          <div className={"d-inline-block"}>
            <Form.Label>Document - {documentType[`${name}`]}</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChangeSearchBox}
              placeholder={
                documentType[`${name}`] ? documentType[`${name}`] : <></>
              }
              name={`${name}|${type}|field`}
            ></Form.Control>
          </div>
        );
    }
    return boxes;
  }

  useEffect(() => {}, [searchElements]);

  function setBoxes(type) {
    const b = keys[type];
    setSearchElements((prevState) => ({
      ...prevState,
      [type]: makeBoxes(b, type),
    }));
  }
  return (
    <StandardLayout
      content={
        <Container className={`p-4 main-content shadow mt-4 mb-4`}>
          <h1>Search</h1>
          <Form>
            <Form.Label column={true}>Search in: </Form.Label>
            <Form.Check
              name="clients_box"
              className="mx-1 my-2"
              label="People"
              type="checkbox"
              onClick={() => {
                setClientBox(!clientBox);
                setBoxes("person");
              }}
            />

            {clientBox ? (
              <div className={"d-flex flex-wrap"}>
                {searchElements["person"]}
              </div>
            ) : (
              <></>
            )}

            {isCaseWorker || isSupervisor ? (
              <>
                <Form.Check
                  className="mx-1"
                  name="documents_box"
                  label="Documents"
                  type="checkbox"
                  onClick={() => {
                    setDocumentBox(!documentBox);
                    setBoxes("document");
                  }}
                />
                {documentBox ? (
                  <div className={"d-flex flex-wrap"}>
                    {searchElements["document"]}
                  </div>
                ) : (
                  <></>
                )}

                <Form.Check
                  className="mx-1 my-2"
                  name="cases_box"
                  label="Cases"
                  type="checkbox"
                  onClick={() => {
                    setCaseBox(!caseBox);
                    setBoxes("case");
                  }}
                />
                {caseBox ? (
                  <div className={"d-flex flex-wrap"}>
                    {searchElements["case"]}
                  </div>
                ) : (
                  <></>
                )}

                {clientBox ? (
                  <div className={"d-flex flex-wrap"}>
                    {searchElements["person"]}
                  </div>
                ) : (
                  <></>
                )}

                <Form.Check
                  name="notes_box"
                  className="mx-1 my-2"
                  label="Notes"
                  type="checkbox"
                  onClick={() => {
                    setNoteBox(!noteBox);
                    setBoxes("note");
                  }}
                />
                {noteBox ? (
                  <div className={"d-flex flex-wrap"}>
                    {searchElements["note"]}
                  </div>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            <Button
              size="lg"
              className="my-3"
              onClick={() => {
                setSubmitted(!submitted);
              }}
            >
              📥 Submit Form
            </Button>
          </Form>
          <Card className={`card-dark shadow p-2`}>
            <h3>
              There {searchResultCount == 1 ? "is " : "are "}
              {searchResultCount + " "}
              match{searchResultCount == 1 ? "" : "es"} for your search result.
            </h3>

            <Table id="results" striped bordered hover responsive>
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
