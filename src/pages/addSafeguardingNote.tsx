import { Container } from 'react-bootstrap';
import { NoteComponent } from '../components/noteComponent';
import StandardLayout from '../layouts/standardLayout';

export default function AddNote () {
  return (
    <StandardLayout
      content={
        <Container className='p-4 main-content shadow mt-4 mb-4'>
          <h1 className='red'>Add Safeguarding Note</h1>
          <h2 className='red bold'>
            ⚠️ You are adding a safeguarding alert to a client.
          </h2>{' '}
          <p>
            Please use this only when there is a danger to yourself, the client,
            or to others.{' '}
            <span className='bold'>
              If this is not the case, please add a regular note.
            </span>
          </p>
          <h2>Please note - all fields are required.</h2>
          <NoteComponent safeguarding />
        </Container>
      }
    />
  );
}
