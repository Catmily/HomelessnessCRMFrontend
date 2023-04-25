import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import Footer from "../components/footer";
import { NoteList, CaseDetails, DocumentList } from "../components/caseDetails";
import {
  GetFullCase,
  RemoveCase,
  WholePersonExport,
} from "../glue/DBConnector";

import HomepageLayout from "../layouts/homepageLayout";
import StandardLayout from "../layouts/standardLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchPerson from "../components/searchFunction";
import { isJWTSupervisor } from "../glue/Auth";

export default function Case() {
  let { id } = useParams();
  const [caseDetails, setCaseDetails] = useState();
  const [person, setPerson] = useState("");
  const [loaded, hasLoaded] = useState<boolean>(false);
  const [reallySure, showReallySure] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const func = async () => {
      //@ts-ignore
      const res = await GetFullCase(id);
      //@ts-ignore

      setCaseDetails(res["data"]["message"][0][0]);
      //@ts-ignore

      setPerson(res["data"]["message"][0][1]);
    };
    func();
  }, []);

  return (
    <StandardLayout
      content={
        <Container className={`p-4 main-content shadow mt-4 mb-4`}>
          <h1>
            Case Management -{" "}
            {
              //@ts-ignore
              person["preferred_name"]
            }
          </h1>{" "}
          <Button size="sm" href={`/profile/${id}`}>
            Go to Client Profile
          </Button>
          <Button size="sm" className="mx-2">
            Go to Search
          </Button>
          <Button size="sm">Make Safeguarding Note</Button>
          <Container className="my-4 ">
            <Tab.Container defaultActiveKey="p2">
              <Row>
                <Row id="selector" className={`shadow p-2`}>
                  <Nav variant="pills">
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
                      {caseDetails ? (
                        //@ts-ignore
                        <Nav.Link
                          eventKey="#"
                          href={`/profile/${caseDetails["case_workers"][0]}`}
                        >
                          Case Worker
                        </Nav.Link>
                      ) : (
                        <></>
                      )}
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="p7">Misc</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Row>

                <Row className="mt-3">
                  <Tab.Content>
                    <Tab.Pane eventKey="p2">
                      <Card className={`card-dark shadow`}>
                        <Container className={`shadow p-3`}>
                          <h1>Case Details</h1>
                        </Container>
                        {caseDetails ? (
                          //@ts-ignore
                          <CaseDetails caseDetails={caseDetails} />
                        ) : (
                          <></>
                        )}
                      </Card>
                    </Tab.Pane>
                    <Tab.Pane eventKey="p3">
                      <Card className={`card-dark shadow`}>
                        <Container className={`shadow p-3`}>
                          <h1>Notes</h1>
                          <Row className="mt-3"></Row>
                        </Container>
                        {caseDetails ? (
                          //@ts-ignore
                          <NoteList
                            caseDetails={caseDetails}
                            safeguarding={false}
                          />
                        ) : (
                          <></>
                        )}
                      </Card>
                    </Tab.Pane>
                    <Tab.Pane eventKey="p4">
                      <Card className={`card-dark shadow`}>
                        <Container className={`shadow p-3`}>
                          <h1>Documents</h1>
                          <Row className="mt-3"></Row>
                        </Container>
                        {caseDetails ? (
                          //@ts-ignore
                          <DocumentList caseDetails={caseDetails} />
                        ) : (
                          <></>
                        )}
                      </Card>
                    </Tab.Pane>

                    <Tab.Pane eventKey="p7">
                      <Card className={`card-dark shadow`}>
                        <Container className={`shadow p-3`}>
                          Assign new case worker:{" "}
                          <SearchPerson staffOnly={true} />
                          <br />
                          <Button
                            onClick={async () => {
                              //@ts-ignore
                              await WholePersonExport(caseDetails["person_id"]);
                            }}
                          >
                            Export Profile
                          </Button>
                          {isJWTSupervisor() ? (
                            <Button
                              onClick={async () => {
                                //@ts-ignore
                                showReallySure(!reallySure);
                              }}
                              variant="warning"
                              className="mx-2"
                            >
                              🔒 Delete
                            </Button>
                          ) : (
                            <></>
                          )}
                          {reallySure ? (
                            <Button
                              onClick={async () => {
                                //@ts-ignore
                                const p = caseDetails["person_id"];
                                //@ts-ignore
                                await RemoveCase(caseDetails["case_id"]);
                                navigate(`/case/${p}`);
                              }}
                              variant="danger"
                            >
                              🔒 PLEASE CONFIRM: I want to delete.
                            </Button>
                          ) : (
                            <></>
                          )}
                        </Container>
                      </Card>
                    </Tab.Pane>
                  </Tab.Content>
                </Row>
              </Row>
            </Tab.Container>
          </Container>
        </Container>
      }
    />
  );
}
