import { Container } from 'react-bootstrap';
import { CaseDetails } from '../components/caseDetails';
import StandardLayout from '../layouts/standardLayout';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GetUserProfile, HasCase } from '../glue/DBConnector';
import { FiveZeroZero } from './500';

export function AddNewCase () {
  const { id } = useParams();
  // const [person, setPerson] = useState<unknown>();
  const [personName, setPersonName] = useState('');
  const [errorWhy, setErrorWhy] = useState('');

  useEffect(() => {
    const func = async () => {
      try {
        const res = await GetUserProfile(id);
        const hasCaseRes = await HasCase(id);

        if (hasCaseRes) {
          setErrorWhy(`This person already HAS a case!
                      Try searching for it if you are not assigned to it.`)
        }

        setPersonName(res['data']['message'][0]['preferred_name']);
      } catch (e) {
        console.log('errowo')
        setErrorWhy(`It appears that
        you are trying to add a case, but the system does not
        know what profile you are attaching it to.`)
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
          <h1>Add New Case - {personName} </h1>
          <CaseDetails
            editMode
            caseDetails={{
              person_id: parseInt(id),
              summary: 'No case details provided.'
            }}
          />
        </Container>
      }
    />
  );
}
