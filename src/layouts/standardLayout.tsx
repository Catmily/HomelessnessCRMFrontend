import { type ReactElement, type ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../components/footer';
import NavBar, { SecondNavBarTime } from '../components/navbar';

interface Props {
  content: ReactNode
};

export default function StandardLayout ({ content }: Props): ReactElement<any, any> {
  return (
    <Container fluid className={'p-0 g-0'}>
      <NavBar />
      <SecondNavBarTime />
      <Container fluid className={'p-0 g-0'}>
        {content}
      </Container>
      <Footer />
    </Container>
  );
}
