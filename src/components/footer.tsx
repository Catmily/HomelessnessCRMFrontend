import { Col, Row, Container } from 'react-bootstrap';

export default function Footer () {
  // Nothing special - though 'Report bug' is just
  // emailing the developer :)
  return (
    <div className={'footer shadow'}>
      <Container className={'p-4'}>
        <Row>
          <Col>
            <h2> Homeless Check </h2>
            <p>Copyright © 2023 Emily Chomicz </p>
          </Col>
          <Col className='align-right'>
            <div className={'d-flex wrap float-end'}>
              <div className={'p-3'}>
                <a href='/api/setup'>Admin Panel</a>
              </div>
              <div className={'p-3'}>
                <a href='mailto:hello@emilychomicz.com'>Report&nbsp;Bug</a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
