import { type ReactElement, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import CaseCardComponent from '../components/caseCardComponent';
import { getPersonId } from '../glue/Auth';
import { GetCases } from '../glue/DBConnector';
import StandardLayout from '../layouts/standardLayout';

export default function Cases (): ReactElement<any, any> {
  const [cases, setCases] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const func = async (): Promise<void> => {
      if (!cases) {
        try {
          const temp = await GetCases(getPersonId());
          const cases = temp['data']['message'];
          setCases(cases);
        } catch (e) {
          setCases([])
        }
      }
    };
    void func();
  }, []);

  useEffect(() => {
    const func = async (): Promise<void> => {
      const cardTemp = [];
      for (let i = 0; i < cases.length; i++) {
        cardTemp.push(
          <CaseCardComponent
            name={`👤 ${cases[i][1].preferred_name}`}
            dateActive={cases[i][0].start_date}
            caseId={cases[i][0].case_id}
            summary={cases[i][0].summary}
          />
        );
      }
      setCards(cardTemp);
    };
    void func();
  }, [cases]);

  return (
    <StandardLayout
      content={
        <Container className='p-3 main-content shadow mt-4 mb-4'>
          <h1>Your Cases:</h1>
          <>{Object.keys(cases).length !== 0
            ? cards
            : `There are no cases assigned to you. 
          If you are expecting some, please contact your Manager or your System Administrator.`}</>
        </Container>
      }
    />
  );
}
