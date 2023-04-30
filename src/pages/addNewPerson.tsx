import { Container } from 'react-bootstrap';
import StandardLayout from '../layouts/standardLayout';
import { type ReactElement } from 'react';
import BasicInformationDetails from '../components/basicInformationDetails';

export function AddNewPerson (): ReactElement<any, any> {
  // const [person, setPerson] = useState<unknown>();
  // const [personName, setPersonName] = useState('');

  return (
    <StandardLayout
      content={
        <Container className={'p-4 main-content shadow mt-4 mb-4'}>
          <h1>Add New Person</h1>
          <>
            <BasicInformationDetails user={undefined} editMode />
          </>
        </Container>
      }
    />
  );
}
