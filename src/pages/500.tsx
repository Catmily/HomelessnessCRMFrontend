import { Container } from 'react-bootstrap';
import StandardLayout from '../layouts/standardLayout';
import { type ReactElement } from 'react';

interface Props {
  howToResolve: string
  container: boolean
}

// howToResolve is useful for us to tell the user what went wrong
// whereas container helps us to show some errors inline, so that
// the user experience is not completely disrupted

export const Content = ({ howToResolve }: Props): ReactElement<any, any> => {
  return (<Container className='p-4 main-content shadow align-center'>
    <img height='150px' src={require('../assets/500.webp')} />
    <br />
    <br />
    <h1>500 - Matrix Failure</h1>
    <br />
    <p>
      <h2>This is what went wrong:</h2>
      {howToResolve}
      <br /><br />

      Try repeating the same action again, making sure what you want to do makes sense. If you are sure that this should be possible,{' '}
      <span className='bold'>
        contact the system administrator.
      </span>{' '}
    </p>
  </Container>)
}

export const FiveZeroZero = ({ howToResolve, container = false }: Props): ReactElement<any, any> => {
  if (container) {
    return (
      <StandardLayout content={<Content howToResolve={howToResolve} container />} />
    )
  } else {
    return (<Content howToResolve={howToResolve} container />)
  }
}
