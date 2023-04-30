import { Container, Card } from 'react-bootstrap';
import CaseAdd from '../assets/icons/case_add.svg';
import Search from '../assets/icons/search.svg';
import Graph from '../assets/icons/graph.svg';
import Safeguarding from '../assets/icons/safeguarding.svg';
import Account from '../assets/icons/account.svg';
import { isJWTCaseWorker, isJWTSupervisor } from '../glue/Auth';

export default function HomepageLayout () {
  return (
    <Container>
      <Container className={'p-4 main-content shadow mt-4 mb-4'}>
        <h1>Welcome to your Portal!</h1>
        <p>To get started, click on one of the tiles below.</p>
        <Container className={'d-inline-flex flex-wrap fade-in'}>
          {isJWTCaseWorker()
            ? (
              <Card className={'card-home card-light m-2 shadow'}>
                <a href='/cases'>
                  <Card.Img alt='Illustration of adding a person' variant='top' src={CaseAdd} />
                  <Card.ImgOverlay>
                    <Card.Body>
                      <Card.Title>Cases</Card.Title>
                    </Card.Body>
                  </Card.ImgOverlay>
                </a>
              </Card>
              )
            : (
              <></>
              )}

          <Card className={'card-home card-dark m-2 shadow'}>
            <a href='/search'>
              <Card.Img alt='Illustration of searching lines' variant='top' src={Search} />
              <Card.ImgOverlay>
                <Card.Body>
                  <Card.Title>Search</Card.Title>
                </Card.Body>
              </Card.ImgOverlay>
            </a>
          </Card>

          <Card className={'card-home card-light m-2 shadow'}>
            <a href='/profile/add'>
              <Card.Img alt='Illustration of a person in a circle' variant='top' src={Account} />
              <Card.ImgOverlay>
                <Card.Body>
                  <Card.Title>Add New Person</Card.Title>
                </Card.Body>
              </Card.ImgOverlay>
            </a>
          </Card>

          {isJWTSupervisor()
            ? (
              <Card className={'card-home card-light m-2 shadow'}>
                <a href='/metrics'>
                  <Card.Img alt='Illustration of a graph' variant='top' src={Graph} />
                  <Card.ImgOverlay>
                    <Card.Body>
                      <Card.Title>At A Glance</Card.Title>
                    </Card.Body>
                  </Card.ImgOverlay>
                </a>
              </Card>
              )
            : (
              <></>
              )}
          <Card className={'card-home card-light m-2 shadow'}>
            <a href='/profile'>
              <Card.Img alt='Illustration of a person in a circle' variant='top' src={Account} />
              <Card.ImgOverlay>
                <Card.Body>
                  <Card.Title>My Profile</Card.Title>
                </Card.Body>
              </Card.ImgOverlay>
            </a>
          </Card>
          <Card className={'card-home card-light m-2 shadow'}>
            <a href='/profile/change-password'>
              <Card.Img alt='Illustration of a shield with a plus in the centre' variant='top' src={Safeguarding} />
              <Card.ImgOverlay>
                <Card.Body>
                  <Card.Title>Change Password</Card.Title>
                </Card.Body>
              </Card.ImgOverlay>
            </a>
          </Card>
          <Card className={'card-home card-light m-2 shadow'}>
            <a href='/logout'>
              <Card.Img alt='Illustration of a shield with a plus in the centre' variant='top' src={Safeguarding} />
              <Card.ImgOverlay>
                <Card.Body>
                  <Card.Title>Logout</Card.Title>
                </Card.Body>
              </Card.ImgOverlay>
            </a>
          </Card>
        </Container>
      </Container>
    </Container>
  );
}
