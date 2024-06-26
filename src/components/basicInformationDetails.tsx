/* eslint-disable multiline-ternary */
import { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  Modal
} from 'react-bootstrap';
import * as $ from 'jquery';
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
  CreatePersonSensitive
} from '../glue/DBConnector';
import { useNavigate } from 'react-router-dom';
import { FiveZeroZero } from '../pages/500';
import { isJWTSupervisor } from '../glue/Auth';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { isoToDate } from '../glue/Other';
interface Props {
  user: string
  editMode: boolean
}

export default function BasicInformationDetails ({
  user,
  editMode = false
}: Props) {
  const [sensitiveVisible, setSensitiveVisible] = useState(false);

  const [userId, setUserId] = useState<string>('');
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
  const [errorWhy, setErrorWhy] = useState('');

  const handleClose = () => { setNukeModalShow(false); };
  const navigate = useNavigate();

  useEffect(() => {
    const func = async () => {
      if (!editMode) {
        if (!isLoaded) {
          setUserId(user);

          try {
            const personProfile = await GetUserProfile(user);
            setUserData(personProfile.data.message['0']);

            const personSensitive = await GetPersonSensitive(user);
            setUserDataSensitive(personSensitive.data.message['0']);

            const hasCaseTemp = await HasCase(user);
            setHasCase(hasCaseTemp);

            const isCaseWorkerTemp = await IsCaseWorker(user);
            setIsCaseWorker(isCaseWorkerTemp);

            const isSupervisorTemp = await IsSupervisor(user);
            setIsManager(isSupervisorTemp);

            setIsLoaded(true);
          } catch (e) {
            // This will throw a 'client side 500' if it can't find the profile
            setErrorWhy(`Could not load user profile. Something has gone terribly wrong. 
            Does this person actually exist?`)
          }
        }
      }
    };
    void func();
  }, []);

  // Event Handlers

  const handleChangeBasic = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChangeDates = (date: any) => {
    const d = new Date(date).toISOString();
    setUserData((prevState: any) => ({
      ...prevState,
      dob: d
    }));
  };

  const handleChangeSensitive = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setUserDataSensitive((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Validate profile fields

  function checkRequiredFields (): boolean {
    if (userData != null) {
      if (userData['preferred_name'] == null || userData['prefered_name'] === '') {
        alert('Please enter a preferred name.')
        return false
      }
      if (userData['city'] == null || userData['city'] === '') {
        alert('Please enter a city. If NFA, the nearest one, or the office.')
        return false
      }
      if (userData['postcode'] == null || userData['postcode'] === '') {
        alert('Please enter a postcode. If NFA, the nearest one, or the office.')
        return false
      }
      if (userData['pronouns'] == null || userData['pronouns'] === '') {
        alert('Please enter the person\'s pronouns. If unknown, write N/A.')
        return false
      }
      if (userData['first_language'] == null || userData['first_language'] === '') {
        alert('Please enter the person\'s first language. If unknown, assume English.')
        return false
      }
    }
    return true;
  }

  useEffect(() => {
    // Two things going on - edit mode (add profile), and non-edit mode (change profile)
    if (changed) {
      const func = async () => {
        if (editMode) {
          const res = await SetUserProfileAdd(userData);
          if (editMode && res != null) {
            const rowId = res.data.row_id;
            await CreatePersonSensitive(rowId)
            navigate(`/profile/${rowId}`);
          }
        } else {
          try {
            await SetUserProfile(userData);
            await SetPersonSensitiveProfile(userDataSensitive);
          } catch (e) {
            alert('Error: Could not set user profile.')
          }
        }
        setChanged(false);
        setFormEnabled(!formEnabled);
      };

      if (!checkRequiredFields()) {
        setChanged(false);
      } else {
        void func();
      }
    }
  }, [changed]);

  if (errorWhy !== '') {
    // if thrown error, show error
    return <FiveZeroZero howToResolve={errorWhy} container={false} />
  }

  return (
    <Container className={'p-4 main-content shadow mt-4 mb-4'}>
      <Container fluid>
        <Row>
          <Col>
            <h1>Profile: {userData.preferred_name }</h1>
            <h2>
              Roles: {isManager ? 'Manager, ' : ''}
              {isCaseWorker ? 'Caseworker, ' : ''} Person
            </h2>
          </Col>
          <Col />
        </Row>
        <Row>
          <Col>
            {!editMode
              ? (
                <Button
                  className={'w-100 float-end ms-2 mx-1'}
                  onClick={() => {
                    setSensitiveVisible(!sensitiveVisible);
                  }}
              >
                  ⚠️ View Sensitive Information
                </Button>
                )
              : (
                <></>
                )}
          </Col>
          {formEnabled ? (
            <>
              {' '}
              {!editMode ? (
                <Col>
                  <Button
                    variant='danger'
                    className={'w-100 '}
                    onClick={() => {
                      setFormEnabled(!formEnabled);
                      setUserData(userDataCopy);
                      setUserDataCopySensitive(userDataCopySensitive);

                      // Reset the form using JQuery
                      // @ts-expect-error JQuery nonsense
                      $('#form')[0].reset();
                      // @ts-expect-error More JQuery nonsense
                      $('#form2')[0].reset();
                    }}
                  >
                    🗙 Cancel
                  </Button>{' '}
                </Col>
              ) : (
                <></>
              )}
              <Col>
                <Button
                  variant='danger'
                  className={'w-100'}
                  onClick={() => {
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
                className={'w-100'}
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
          <Form id='form'>
            <Row>
              <Col xs={12} s={12} md={4}>
                <Form.Label column htmlFor='preferred_name'>Preferred Name* (max. 30 char)</Form.Label>
                <Form.Control
                  id='preferred_name'
                  type='text'
                  name='preferred_name'
                  placeholder='Preferred Name'
                  onChange={handleChangeBasic}
                  defaultValue={userData.preferred_name || ''}

                  // Bootstrap validation
                  isInvalid={(userData['preferred_name'] != null) ? userData['preferred_name'].length > 30 : false}

                  />
                <Form.Control.Feedback type='invalid'>
                  Preferred name must be less than 30 characters.
                </Form.Control.Feedback>
              </Col>
              <Col xs={12} s={12} md={4}>
                <Form.Label column htmlFor='full_name'>Full Name*</Form.Label>
                <Form.Control
                  id='full_name'
                  type='text'
                  name='full_name'
                  placeholder='Full Name'
                  onChange={handleChangeBasic}
                  defaultValue={userData.full_name || ''}
                />
              </Col>
              <Col xs={12} s={12} md={4}>
                <Form.Label htmlFor='phone' column>Phone Number</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id='inputGroupPrepend'>📞</InputGroup.Text>
                  <Form.Control
                    id='phone'
                    type='text'
                    name='phone'
                    placeholder='Phone Number'
                    onChange={handleChangeBasic}
                    defaultValue={userData.phone || ''}
                    isInvalid={(userData['phone'] != null) ? !(userData['phone'].length >= 8 && userData['phone'].length <= 15) : false}

                  />
                  <Form.Control.Feedback type='invalid'>
                    Please put in a valid phone number.
                  </Form.Control.Feedback>
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12} s={12} md={4}>
                <br />
                <p>Address</p>
                <InputGroup hasValidation>
                  <InputGroup.Text id='inputGroupPrepend'>1</InputGroup.Text>
                  <Form.Control
                    id='address_1'
                    type='text'
                    name='address_1'
                    aria-label='Address Line 1'
                    placeholder='Address Line 1'
                    onChange={handleChangeBasic}
                    defaultValue={userData.address_1 || ''}
                  />
                </InputGroup>
                <InputGroup hasValidation>
                  <InputGroup.Text id='inputGroupPrepend'>2</InputGroup.Text>
                  <Form.Control
                    id='address_2'
                    type='text'
                    name='address_2'
                    aria-label='Address Line 2'

                    placeholder='Address Line 2'
                    onChange={handleChangeBasic}
                    defaultValue={userData.address_2 || ''}
                  />
                </InputGroup>
                <InputGroup hasValidation>
                  <InputGroup.Text id='inputGroupPrepend'>3</InputGroup.Text>
                  <Form.Control
                    type='text'
                    name='address_3'
                    aria-label='Address Line 3'

                    placeholder='Address Line 3'
                    onChange={handleChangeBasic}
                    defaultValue={userData.address_3 || ''}
                  />
                </InputGroup>
                <InputGroup hasValidation>
                  <InputGroup.Text id='inputGroupPrepend'>City* (if none, closest)</InputGroup.Text>
                  <Form.Control
                    type='text'
                    name='city'
                    aria-label='City'

                    placeholder='City'
                    onChange={handleChangeBasic}
                    defaultValue={userData.city || ''}
                  />
                </InputGroup>
                <InputGroup hasValidation>
                  <InputGroup.Text id='inputGroupPrepend'>
                    Postcode* (if not, closest)
                  </InputGroup.Text>

                  <Form.Control
                    type='text'
                    aria-label='Postcode'
                    name='postcode'
                    placeholder='Postcode'
                    onChange={handleChangeBasic}
                    defaultValue={userData.postcode || ''}
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please put in a valid postcode.
                  </Form.Control.Feedback>
                </InputGroup>
              </Col>

              <Col xs={12} s={12} md={4}>
                <Form.Label column htmlFor='pronouns'>Pronouns (max. 15 char)</Form.Label>
                <Form.Control
                  type='text'
                  id='pronouns'
                  name='pronouns'
                  placeholder='Pronouns'
                  onChange={handleChangeBasic}
                  defaultValue={userData.pronouns || ''}
                  isInvalid={(userData['pronouns'] != null) ? !(userData['pronouns'].length < 15) : false}

                  />
                <Form.Control.Feedback type='invalid'>
                  Pronouns longer than 15 characters.
                </Form.Control.Feedback>
                <Form.Label column htmlFor='first_language'>First Language*</Form.Label>
                <Form.Control
                  type='text'
                  id='first_language'
                  name='first_language'
                  placeholder='First Language'
                  onChange={handleChangeBasic}
                  defaultValue={userData.first_language || ''}
                />
              </Col>

              <Col xs={12} s={12} md={4}>
                <Form.Label column htmlFor='email_address'>Email Address</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id='inputGroupPrepend'>@</InputGroup.Text>
                  <Form.Control
                    type='tel'
                    id='email_address'
                    name='email'
                    placeholder='Email address'
                    onChange={handleChangeBasic}
                    defaultValue={userData.email || ''}
                    isInvalid={(userData['email'] != null) ? !(userData['email'].includes('@')) : false}

                  />
                  <Form.Control.Feedback type='invalid'>
                    Please put in a valid email address.
                  </Form.Control.Feedback>
                </InputGroup>
                <Form.Label column htmlFor='date_of_birth'>Date of Birth</Form.Label>
                <InputGroup hasValidation>
                  <DatePicker
                    showIcon
                    type='date'
                    id='date_of_birth'
                    name='dob'
                    onChange={(date) => handleChangeDates(date)}
                    dateFormat='yyyy/MM/dd'
                    placeholderText={userData['dob'] != null ? isoToDate(userData['dob']) : ''}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12} s={12} md={4}>
                <Form.Label column htmlFor='gender'>Gender (max. 15 char)</Form.Label>
                <Form.Control
                  type='text'
                  id='gender'
                  name='gender'
                  placeholder='Gender'
                  onChange={handleChangeBasic}
                  defaultValue={userData['gender'] || ''}
                  isInvalid={(userData['gender'] != null) ? !(userData['gender'].length < 15) : false}

                  />
                <Form.Control.Feedback type='invalid'>
                  Gender longer than 15 characters.
                </Form.Control.Feedback>
              </Col>
            </Row>
            <br />

            <Row>
              {!editMode
                ? (
                  <>
                    {isJWTSupervisor() && !hasCase
                      ? (
                        <>
                          <Col>
                            <Button
                              variant='warning'
                              onClick={() => {
                                navigate(`/case/add/${userId}`);
                              }}
                              className='w-100 float-end'
                        >
                              🔒 Add Case for Profile
                            </Button>
                          </Col>
                        </>
                        )
                      : (
                        <></>
                        )}

                    {
                    // Stops yourself from being able to delete your own
                    // profile
                    // eslint-disable-next-line eqeqeq
                    isJWTSupervisor() && userId != '1'
                      ? (
                        <Col>
                          <Button
                            variant='warning'
                            onClick={() => {
                              setNukeModalShow(true);
                            }}
                            className='w-100 float-end'
                      >
                            ☢️ Nuke
                          </Button>
                        </Col>
                        )
                      : (
                        <></>
                        )}
                  </>
                  )
                : (
                  <></>
                  )}

              {!editMode && isJWTSupervisor()
                ? (
                  <>
                    <Col>
                      <Button
                        variant='warning'
                        className={'w-100 float-end'}
                        onClick={async () => {
                          if (isCaseWorker) {
                            await CaseWorkerPerms(user, false);
                            setIsCaseWorker(false);
                          } else {
                            await CaseWorkerPerms(user, true);
                            setIsCaseWorker(true);
                          }
                        }}
                    >
                        🔒 {isCaseWorker ? 'Remove' : 'Set'} as Case Worker{' '}
                      </Button>
                    </Col>
                  </>
                  )
                : (
                  <></>
                  )}

              {!editMode && isJWTSupervisor()
                ? (
                  <>
                    <Col>
                      <Button
                        variant='warning'
                        className={'w-100 float-end'}
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
                        🔒 {isManager ? 'Remove' : 'Set'} as Manager{' '}
                      </Button>
                    </Col>
                  </>
                  )
                : (
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
                  variant='danger'
                  onClick={async () => {
                    await RemovePerson(user);
                    navigate('/');
                  }}
                >
                  DELETE
                </Button>
                <Button variant='secondary' onClick={handleClose}>
                  CANCEL
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        </fieldset>
        <br />
        <Row>
          <Col>
            {sensitiveVisible
              ? (
                <>
                  <fieldset disabled={!formEnabled} className='mt-5'>
                    <Form id='form2'>
                      <Row>
                        <Col xs={12} s={12} md={4}>
                          <Form.Label column htmlFor='nationality'>Nationality</Form.Label>
                          <Form.Control
                            id='nationality'
                            type='text'
                            name='nationality'
                            placeholder='Nationality'
                            onChange={handleChangeSensitive}
                            defaultValue={userDataSensitive.nationality || ''}
                        />
                        </Col>
                        <Col xs={12} s={12} md={4}>
                          <Form.Label column htmlFor='religion'>Religion</Form.Label>
                          <Form.Control
                            id='religion'
                            type='text'
                            name='religion'
                            placeholder='Religion'
                            onChange={handleChangeSensitive}
                            defaultValue={userDataSensitive.religion || ''}
                        />
                        </Col>
                        <Col xs={12} s={12} md={4}>
                          <Form.Label column htmlFor='sex_or'>
                            Sexual Orientation
                          </Form.Label>
                          <Form.Control
                            id='sex_or'
                            type='text'
                            name='sexual_orientation'
                            placeholder='Sexual Orientation'
                            onChange={handleChangeSensitive}
                            defaultValue={
                            userDataSensitive.sexual_orientation || ''
                          }
                        />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} s={12} md={4}>
                          <Form.Label column htmlFor='sex'>Sex</Form.Label>
                          <Form.Control
                            id='sex'
                            type='text'
                            name='sex'
                            placeholder='Sex'
                            onChange={handleChangeSensitive}
                            defaultValue={userDataSensitive.sex || ''}
                        />
                        </Col>
                        <Col xs={12} s={12} md={4}>
                          <Form.Label htmlFor='eth' column>Ethnicity</Form.Label>
                          <Form.Control
                            id='eth'
                            type='text'
                            name='ethnicity'
                            placeholder='Ethnicity'
                            onChange={handleChangeSensitive}
                            defaultValue={userDataSensitive.ethnicity || ''}
                        />
                        </Col>
                        <Col xs={12} s={12} md={4}>
                          <Form.Label column htmlFor='im_stat'>
                            Immigration Status
                          </Form.Label>
                          <Form.Control
                            id='im_stat'
                            type='text'
                            name='immigration_status'
                            placeholder='Immigration Status'
                            onChange={handleChangeSensitive}
                            defaultValue={
                            userDataSensitive.immigration_status || ''
                          }
                        />
                        </Col>
                      </Row>
                    </Form>
                  </fieldset>
                </>
                )
              : (
                <></>
                )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
