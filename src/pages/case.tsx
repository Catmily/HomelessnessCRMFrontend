/* eslint-disable react/react-in-jsx-scope */
import {
  Button,
  Card,
  Container,
  Nav,
  Row,
  Tab
} from 'react-bootstrap';
import { NoteList, CaseDetails, DocumentList } from '../components/caseDetails';
import {
  AddCaseWorkerToCase,
  GetFullCase,
  RemoveCase,
  RemoveCaseWorkerFromCase,
  WholePersonExport
} from '../glue/DBConnector';

import StandardLayout from '../layouts/standardLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SearchPerson from '../components/searchFunction';
import { isJWTCaseWorker, isJWTSupervisor } from '../glue/Auth';
import { FiveZeroZero } from './500';

export default function Case () {
  const { id } = useParams();
  const [selectedDropdown, setSelectedDropdown] = useState('');
  const [caseDetails, setCaseDetails] = useState();
  const [person, setPerson] = useState('');
  // const [loaded, hasLoaded] = useState<boolean>(false);
  const [reallySure, showReallySure] = useState<boolean>(false);
  const navigate = useNavigate();
  const [errorWhy, setErrorWhy] = useState('');

  const handleDropdownSelect = (selected) => {
    setSelectedDropdown(selected);
    console.log(`Selected value: ${selected}`);
  }

  useEffect(() => {
    const func = async (): Promise<void> => {
      console.log(selectedDropdown);
      if (caseDetails && selectedDropdown !== '') {
        try {
          await AddCaseWorkerToCase(selectedDropdown, caseDetails['case_id'])
          window.location.reload();
        } catch {
          alert('Could not add caseworker to case.')
        }
      }
    };
    void func();
  }, [selectedDropdown]);

  useEffect(() => {
    const func = async (): Promise<void> => {
      try {
        const res = await GetFullCase(id);
        setCaseDetails(res['data']['message'][0][0]);
        setPerson(res['data']['message'][0][1]);
        console.log(caseDetails);
      } catch (e) {
        setErrorWhy(`Cannot find the case that you're looking for!
                    Try searching for it if you are not assigned to it,
                    and check if you have the right case number.`)
      }
    };
    void func();
  }, []);

  if (errorWhy !== '') {
    return <FiveZeroZero howToResolve={errorWhy} container />
  }

  return (
    <StandardLayout
      content={
        <Container className={'p-4 main-content shadow mt-4 mb-4'}>
          <h1>
            Case Management -{' '}
            {
              person['preferred_name']
            }
          </h1>{' '}
          <Button size='sm' href={`/profile/${person['person_id']}`}>
            Go to Client Profile
          </Button>
          <Button size='sm' className='ms-2' href={`/safeguarding/user/add/${person['preferred_name']}`}>Make Safeguarding Note</Button>
          <Container className='my-4 '>
            <Tab.Container defaultActiveKey='p2'>
              <Row>
                <Row id='selector' className={'shadow p-2'}>
                  <Nav variant='pills'>
                    <Nav.Item>
                      <Nav.Link eventKey='p2'>Case Details</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey='p3'>Notes</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey='p3.5'>Safeguarding Notes</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey='p4'>Documents</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      {caseDetails
                      // @ts-expect-error Type is fine
                        ? (caseDetails['case_workers'].length !== 0)
                            ? <>
                              <Nav.Link
                                eventKey='#'
                                href={`/profile/${caseDetails['case_workers'][0]}`}
                        >
                                Case Worker
                              </Nav.Link></>

                            : <></>
                        : <></>}
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey='p7'>Misc</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Row>

                <Row className='mt-3'>
                  <Tab.Content>
                    <Tab.Pane eventKey='p2'>
                      <Card className={'card-dark shadow'}>
                        <Container className={'shadow p-3'}>
                          <h1>Case Details</h1>
                        </Container>
                        {caseDetails
                          ? (
                            <CaseDetails caseDetails={caseDetails} editMode={false} />
                            )
                          : (
                            <></>
                            )}
                      </Card>
                    </Tab.Pane>
                    <Tab.Pane eventKey='p3'>
                      <Card className={'card-dark shadow'}>
                        <Container className={'shadow p-3'}>
                          <h1>Notes</h1>
                          <Row className='mt-3' />
                        </Container>
                        {caseDetails
                          ? (
                            <NoteList
                              caseDetails={caseDetails}
                              safeguarding={false}
                          />
                            )
                          : (
                            <></>
                            )}
                      </Card>
                    </Tab.Pane>
                    <Tab.Pane eventKey='p3.5'>
                      <Card className={'card-dark shadow'}>
                        <Container className={'shadow p-3'}>
                          <h1>Safeguarding Notes</h1>
                          <Row className='mt-3' />
                        </Container>
                        {caseDetails
                          ? (
                            <NoteList
                              caseDetails={caseDetails}
                              safeguarding
                          />
                            )
                          : (
                            <></>
                            )}
                      </Card>
                    </Tab.Pane>
                    <Tab.Pane eventKey='p4'>
                      <Card className={'card-dark shadow'}>
                        <Container className={'shadow p-3'}>
                          <h1>Documents</h1>
                          <Row className='mt-3' />
                        </Container>
                        {caseDetails
                          ? (
                            <DocumentList caseDetails={caseDetails} editMode={false} />
                            )
                          : (
                            <></>
                            )}
                      </Card>
                    </Tab.Pane>

                    <Tab.Pane eventKey='p7'>
                      <Card className={'card-dark shadow'}>
                        <Container className={'shadow p-3'}>
                          {
                          (caseDetails !== undefined && isJWTCaseWorker())
                          // @ts-expect-error Already checked
                            ? caseDetails['case_workers'].length === 0
                              ? <>
                                Assign new case worker:{' '}
                                <SearchPerson dropdownSelect={handleDropdownSelect} staffOnly /></>
                              : <><Button className='mt-2 mb-2' onClick={
                                async () => {
                                  try {
                                    if (caseDetails) {
                                      await RemoveCaseWorkerFromCase(caseDetails['case_id']);
                                      window.location.reload()
                                    }
                                  } catch {
                                    alert('Could not remove case worker from case.')
                                  }
                                }
                              }>Remove Case Worker</Button></>
                            : <></>}
                          <br />
                          <Button
                            onClick={async () => {
                              try {
                                // @ts-expect-error aaaa
                                await WholePersonExport(caseDetails['person_id']);
                              } catch (e) {
                                alert('Error: Cannot export person. Your action could not be completed.')
                              }
                            }}
                          >
                            Export Profile
                          </Button>
                          {isJWTSupervisor()
                            ? (
                              <Button
                                onClick={async () => {
                                  showReallySure(!reallySure);
                                }}
                                variant='warning'
                                className='mx-2'
                            >
                                🔒 Delete
                              </Button>
                              )
                            : (
                              <></>
                              )}
                          {reallySure
                            ? (
                              <Button
                                onClick={async () => {
                                  try {
                                  // @ts-expect-error Case Details
                                    const p = caseDetails['person_id'];
                                    // @ts-expect-error Case Details
                                    await RemoveCase(caseDetails['case_id']);
                                    navigate(`/case/${p}`);
                                  } catch (e) {
                                    alert('Error: Cannot remove case. Your action could not be completed.')
                                  }
                                }}
                                variant='danger'
                            >
                                🔒 PLEASE CONFIRM: I want to delete.
                              </Button>
                              )
                            : (
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
