import { Container, Card } from "react-bootstrap";
import Footer from "../components/footer";
import CaseAdd from '../assets/icons/case_add.svg';
import Search from '../assets/icons/search.svg';
import Graph from '../assets/icons/graph.svg';
import Safeguarding from '../assets/icons/safeguarding.svg';
import Account from '../assets/icons/account.svg';
import Resources from '../assets/icons/article.svg';
import More from '../assets/icons/more.svg';

export default function HomepageLayout() {
return (<Container><Container className={`p-4 main-content shadow mt-4 mb-4`}>
    <h1>Welcome to your Portal!</h1>
    <p>To get started, click on one of the tiles below.</p>

<Container className={`d-inline-flex flex-wrap fade-in`}>
    <Card className={`card-home card-light m-2 shadow`}>
  <Card.Img variant="top" src={CaseAdd} />
  <Card.ImgOverlay>
  <Card.Body>
    <Card.Title>Cases</Card.Title>
  </Card.Body></Card.ImgOverlay>
</Card>
<Card className={`card-home card-dark m-2 shadow`}>
  <Card.Img variant="top" src={Search} />
  <Card.ImgOverlay>
  <Card.Body>
    <Card.Title>Search</Card.Title>
  </Card.Body></Card.ImgOverlay>
</Card>
<Card  className={`card-home card-light m-2 shadow`}>
  <Card.Img variant="top" src={Graph} />
  <Card.ImgOverlay>
  <Card.Body>
    <Card.Title>At A Glance</Card.Title>
  </Card.Body></Card.ImgOverlay>
  </Card>
<Card className={`card-home card-dark m-2 shadow`}>
  <Card.Img variant="top" src={Safeguarding} />
  <Card.ImgOverlay>
  <Card.Body>
    <Card.Title>Safeguarding</Card.Title>
  </Card.Body></Card.ImgOverlay>
</Card>
<Card className={`card-home card-light m-2 shadow`}>
  <Card.Img variant="top" src={Account} />
  <Card.ImgOverlay>
  <Card.Body>
    <Card.Title>My Profile</Card.Title>
  </Card.Body></Card.ImgOverlay>
</Card>
<Card className={`card-home card-dark m-2 shadow`}>
  <Card.Img variant="top" src={Resources} />
  <Card.ImgOverlay>
  <Card.Body>
    <Card.Title>Resources</Card.Title>
  </Card.Body></Card.ImgOverlay>
</Card>
<Card className={`card-home card-light m-2 shadow`}>
  <Card.Img variant="top" src={More} />
  <Card.ImgOverlay>
  <Card.Body>
    <Card.Title>More...</Card.Title>
  </Card.Body></Card.ImgOverlay>
</Card>
</Container>
</Container>
  
 </Container>)
}