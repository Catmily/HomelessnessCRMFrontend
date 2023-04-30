import { Container } from 'react-bootstrap';
import StandardLayout from '../layouts/standardLayout';
import { type ReactElement } from 'react';

export default function FourOhFour (): ReactElement<any, any> {
  return (
    <StandardLayout
      content={
        <Container className='p-4 main-content shadow align-center'>
          <img height='150px' src={require('../assets/tardis404.png')} />
          <br />
          <br />
          <h1>404 - Page Eaten by Cat</h1>
          <br />
          <h2>Oh no, this page doesn&apos;t exist!</h2>
          <p>
            Make sure you are <a href='/login'>signed in</a>, or alternatively,
            it really doesn&apos;t exist. <br />
            <span className='bold'>
              Perhaps it&apos;s due to some wibbly wobbly timey wimey stuff.
            </span>{' '}
          </p>
        </Container>
      }
    />
  );
}
