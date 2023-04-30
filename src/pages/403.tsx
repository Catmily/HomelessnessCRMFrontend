import { Container } from 'react-bootstrap';
import StandardLayout from '../layouts/standardLayout';
import { type ReactElement } from 'react';

export default function FourOhThree (): ReactElement<any, any> {
  return (
    <StandardLayout
      content={
        <Container className='p-4 main-content shadow align-center'>
          <img height='150px' src={require('../assets/perms.jpg')} />
          <br />
          <br />
          <h1>403 - Naughty, Naughty!</h1>
          <br />
          <h2>Oh no, you don&apos;t have permissions for that!</h2>
          <p>
            Make sure you are <a href='/login'>signed in</a> to the right
            account, or alternatively, ask your manager or system admin. <br />
            <span className='bold'>
              Perhaps it&apos;s due to some wibbly wobbly timey wimey stuff.
            </span>{' '}
          </p>
        </Container>
      }
    />
  );
}
