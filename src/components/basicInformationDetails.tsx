import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";
import * as $ from "jquery";
import { isoToDate } from "../glue/Other";
import {
  GetPersonSensitive,
  GetUserProfile,
  HasCase,
  IsCaseWorker,
  IsSupervisor,
  CaseWorkerPerms,
  SupervisorPerms,
  RemovePerson,
  SetPersonSensitiveProfile,
  SetUserProfile,
  SetUserProfileAdd,
} from "../glue/DBConnector";
import { useNavigate } from "react-router-dom";
import { isJWTCaseWorker, isJWTSupervisor } from "../glue/Auth";
type Props = {
  user: string;
  editMode: boolean;
};

// interface FormState {
//     [key: string]: string;
//   }

export default function BasicInformationDetails({
  user,
  editMode = false,
}: Props) {
  const [sensitiveVisible, setSensitiveVisible] = useState(false);

  const [userData, setUserData] = useState(Object);
  const [userDataCopy, setUserDataCopy] = useState(Object);

  const [userDataSensitive, setUserDataSensitive] = useState(Object);
  const [userDataCopySensitive, setUserDataCopySensitive] = useState(Object);

  const [hasCase, setHasCase] = useState(false);
  const [isCaseWorker, setIsCaseWorker] = useState(false);
  const [isManager, setIsManager] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [formEnabled, setFormEnabled] = useState<boolean>(editMode);
  const [changed, setChanged] = useState<boolean>(false);

  const [nukeModalShow, setNukeModalShow] = useState(false);

  const handleClose = () => setNukeModalShow(false);

  const navigate = useNavigate();

  useEffect(() => {
    const func = async () => {
      if (!editMode) {
        if (!isLoaded) {
          const personProfile = await GetUserProfile(user);
          setUserData(personProfile.data.message["0"]);

          const personSensitive = await GetPersonSensitive(user);
          setUserDataSensitive(personSensitive.data.message["0"]);

          const hasCaseTemp = await HasCase(user);
          setHasCase(hasCaseTemp);

          const isCaseWorkerTemp = await IsCaseWorker(user);
          setIsCaseWorker(isCaseWorkerTemp);

          const isSupervisorTemp = await IsSupervisor(user);
          setIsManager(isSupervisorTemp);

          setIsLoaded(true);
        }
      }
    };
    func();
  }, []);

  const handleChangeBasic = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeDates = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const d = new Date(value).toISOString();
    setUserData((prevState: any) => ({
      ...prevState,
      [name]: d,
    }));
  };

  const handleChangeSensitive = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setUserDataSensitive((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (changed) {
      const func = async () => {
        if (editMode) {
          let res = await SetUserProfileAdd(userData);
          if (editMode) {
            const row_id = res["data"]["row_id"];
            navigate(`/profile/${row_id}`);
          }
        } else {
          await SetUserProfile(userData);
          await SetPersonSensitiveProfile(userDataSensitive);
        }
        setChanged(false);
      };
      func();
    }
  }, [changed]);

  return (
    <Container className={`p-4 main-content shadow mt-4 mb-4`}>
      <Container fluid>
        <Row>
          <Col>
            <h1>Profile: {userData["preferred_name"]}</h1>
            <h2>
              Roles: {isManager ? "Manager, " : ""}
              {isCaseWorker ? "Caseworker, " : ""} Person
            </h2>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>
            {!editMode ? (
              <Button
                className={`w-100 float-end ms-2 mx-1`}
                onClick={() => {
                  setSensitiveVisible(!sensitiveVisible);
                }}
              >
                ⚠️ View Sensitive Information
              </Button>
            ) : (
              <></>
            )}
          </Col>
          {formEnabled ? (
            <>
              {" "}
              {!editMode ? (
                <Col>
                  <Button
                    variant="danger"
                    className={`w-100 `}
                    onClick={() => {
                      setFormEnabled(!formEnabled);
                      setUserData(userDataCopy);
                      setUserDataCopySensitive(userDataCopySensitive);
                      //@ts-ignore
                      $("#form")[0].reset();
                      //@ts-ignore

                      $("#form2")[0].reset();
                    }}
                  >
                    🗙 Cancel
                  </Button>{" "}
                </Col>
              ) : (
                <></>
              )}
              <Col>
                <Button
                  variant="danger"
                  className={`w-100`}
                  onClick={() => {
                    setFormEnabled(!formEnabled);
                    setChanged(true);
                  }}
                >
                  📥 Submit
                </Button>
              </Col>
            </>
          ) : (
            <Col>
              <Button
                className={`w-100`}
                onClick={() => {
                  setFormEnabled(!formEnabled);
                  setUserDataCopy(userData);
                  setUserDataCopySensitive(userDataSensitive);
                }}
              >
                ✏️ Edit
              </Button>
            </Col>
          )}
        </Row>
        <fieldset disabled={!formEnabled}>
          <Form id="form">
            <Row>
              <Col xs={12} s={12} md={4}>
                <Form.Label column={true}>Preferred Name*</Form.Label>
                <Form.Control
                  type="text"
                  name="preferred_name"
                  placeholder="Preferred Name"
                  onChange={handleChangeBasic}
                  defaultValue={userData["preferred_name"] || ""}
                />
              </Col>
              <Col xs={12} s={12} md={4}>
                <Form.Label column={true}>Full Name*</Form.Label>
                <Form.Control
                  type="text"
                  name="full_name"
                  placeholder="Full Name"
                  onChange={handleChangeBasic}
                  defaultValue={userData["full_name"] || ""}
                />
              </Col>
              <Col xs={12} s={12} md={4}>
                <Form.Label column={true}>Phone Number</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">📞</InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    onChange={handleChangeBasic}
                    defaultValue={userData["phone"] || ""}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please put in a valid phone number.
                  </Form.Control.Feedback>
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12} s={12} md={4}>
                <Form.Label column={true}>Address</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">1</InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="address_line_1"
                    placeholder="Address Line 1"
                    onChange={handleChangeBasic}
                    defaultValue={userData["address_1"] || ""}
                  />
                </InputGroup>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">2</InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="address_line_2"
                    placeholder="Address Line 2"
                    onChange={handleChangeBasic}
                    defaultValue={userData["address_2"] || ""}
                  />
                </InputGroup>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">3</InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="address_line_3"
                    placeholder="Address Line 3"
                    onChange={handleChangeBasic}
                    defaultValue={userData["address_3"] || ""}
                  />
                </InputGroup>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">City</InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="city"
                    placeholder="City"
                    onChange={handleChangeBasic}
                    defaultValue={userData["city"] || ""}
                  />
                </InputGroup>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">
                    Postcode
                  </InputGroup.Text>

                  <Form.Control
                    type="text"
                    name="postcode"
                    placeholder="Postcode"
                    onChange={handleChangeBasic}
                    defaultValue={userData["postcode"] || ""}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please put in a valid postcode.
                  </Form.Control.Feedback>
                </InputGroup>
              </Col>

              <Col xs={12} s={12} md={4}>
                <Form.Label column={true}>Pronouns</Form.Label>
                <Form.Control
                  type="text"
                  name="pronouns"
                  placeholder="Pronouns"
                  onChange={handleChangeBasic}
                  defaultValue={userData["pronouns"] || ""}
                />
                <Form.Label column={true}>First Language</Form.Label>
                <Form.Control
                  type="text"
                  name="first_language"
                  placeholder="First Language"
                  onChange={handleChangeBasic}
                  defaultValue={userData["first_language"] || ""}
                />
              </Col>

              <Col xs={12} s={12} md={4}>
                <Form.Label column={true}>Email Address</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder="Email address"
                    onChange={handleChangeBasic}
                    defaultValue={userData["email"] || ""}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please put in a valid email address.
                  </Form.Control.Feedback>
                </InputGroup>
                <Form.Label column={true}>Date of Birth</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">📅</InputGroup.Text>
                  <Form.Control
                    type="date"
                    name="dob"
                    onChange={handleChangeDates}
                    placeholder="Date of Birth"
                    defaultValue="2023-04-14"
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12} s={12} md={4}>
                <span> </span>
              </Col>
            </Row>
            <br />

            <Row>
              {!editMode ? (
                <>
                  {isJWTSupervisor() && !hasCase ? (
                    <>
                      <Col>
                        <Button
                          variant="warning"
                          onClick={() => {
                            navigate(`/case/add/${user}`);
                          }}
                          className="w-100 float-end"
                        >
                          🔒 Add Case for Profile
                        </Button>
                      </Col>
                    </>
                  ) : (
                    <></>
                  )}

                  {isJWTSupervisor() ? (
                    <Col>
                      <Button
                        variant="warning"
                        onClick={() => {
                          setNukeModalShow(true);
                        }}
                        className="w-100 float-end"
                      >
                        ☢️ Nuke
                      </Button>
                    </Col>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}

              {!editMode && isJWTSupervisor() ? (
                <>
                  <Col>
                    <Button
                      variant="warning"
                      className={`w-100 float-end`}
                      onClick={async () => {
                        if (isCaseWorker) {
                          await CaseWorkerPerms(user, false);
                          setIsCaseWorker(false);
                        } else {
                          await CaseWorkerPerms(user, true);
                          setIsManager(true);
                        }
                      }}
                    >
                      🔒 {isCaseWorker ? "Remove" : "Set"} as Case Worker{" "}
                    </Button>
                  </Col>
                </>
              ) : (
                <></>
              )}

              {!editMode && isJWTSupervisor() ? (
                <>
                  <Col>
                    <Button
                      variant="warning"
                      className={`w-100 float-end`}
                      onClick={async () => {
                        if (isManager) {
                          await SupervisorPerms(user, false);
                          setIsManager(false);
                        } else {
                          await SupervisorPerms(user, true);
                          setIsManager(true);
                        }
                      }}
                    >
                      🔒 {isManager ? "Remove" : "Set"} as Manager{" "}
                    </Button>
                  </Col>
                </>
              ) : (
                <></>
              )}
            </Row>

            <Modal show={nukeModalShow} onHide={handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>
                  Are you sure you want to delete this person?
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                NOTE: This will ONLY delete the person profile. You will have to
                delete any cases manually.
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="danger"
                  onClick={async () => {
                    await RemovePerson(user);
                    navigate("/");
                  }}
                >
                  DELETE
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  CANCEL
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        </fieldset>
        <br />
        <Row>
          <Col>
            {sensitiveVisible ? (
              <>
                <fieldset disabled={!formEnabled} className="mt-5">
                  <Form id="form2">
                    <Row>
                      <Col xs={12} s={12} md={4}>
                        <Form.Label column={true}>Nationality</Form.Label>
                        <Form.Control
                          type="text"
                          name="nationality"
                          placeholder="Nationality"
                          onChange={handleChangeSensitive}
                          defaultValue={userDataSensitive["nationality"] || ""}
                        />
                      </Col>
                      <Col xs={12} s={12} md={4}>
                        <Form.Label column={true}>Religion</Form.Label>
                        <Form.Control
                          type="text"
                          name="religion"
                          placeholder="Religion"
                          onChange={handleChangeSensitive}
                          defaultValue={userDataSensitive["religion"] || ""}
                        />
                      </Col>
                      <Col xs={12} s={12} md={4}>
                        <Form.Label column={true}>
                          Sexual Orientation
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="sexual_orientation"
                          placeholder="Sexual Orientation"
                          onChange={handleChangeSensitive}
                          defaultValue={
                            userDataSensitive["sexual_orientation"] || ""
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} s={12} md={4}>
                        <Form.Label column={true}>Sex</Form.Label>
                        <Form.Control
                          type="text"
                          name="sex"
                          placeholder="Sex"
                          onChange={handleChangeSensitive}
                          defaultValue={userDataSensitive["sex"] || ""}
                        />
                      </Col>
                      <Col xs={12} s={12} md={4}>
                        <Form.Label column={true}>Ethnicity</Form.Label>
                        <Form.Control
                          type="text"
                          name="ethnicity"
                          placeholder="Ethnicity"
                          onChange={handleChangeSensitive}
                          defaultValue={userDataSensitive["ethnicity"] || ""}
                        />
                      </Col>
                      <Col xs={12} s={12} md={4}>
                        <Form.Label column={true}>
                          Immigration Status
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="immigration_status"
                          placeholder="Immigration Status"
                          onChange={handleChangeSensitive}
                          defaultValue={
                            userDataSensitive["immigration_status"] || ""
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} s={12} md={4}>
                        <Form.Label column={true}>
                          Sexual Orientation
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="sexual_orientation"
                          placeholder="Sexual Orientation"
                          onChange={handleChangeSensitive}
                          defaultValue={
                            userDataSensitive["sexual_orientation"] || ""
                          }
                        />
                      </Col>
                      <Col xs={12} s={12} md={4}></Col>
                      <Col xs={12} s={12} md={4}></Col>
                    </Row>
                  </Form>
                </fieldset>
              </>
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
