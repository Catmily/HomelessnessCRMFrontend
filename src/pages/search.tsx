import { Container, Dropdown, Form, Row, Col, Button, Card } from "react-bootstrap";
import SearchBar from "../components/searchBar";
import StandardLayout from "../layouts/standardLayout";
import Table from 'react-bootstrap/Table';
export default function Search() {
    return (
        <StandardLayout content={
            <Container className={`p-4 main-content shadow mt-4 mb-4`}><h1>Search</h1>
            
            <SearchBar />
            <br />
            <Form>
            <Form.Label column={true}>Search in: </Form.Label>
                <Form.Check
                    className="d-inline-block ms-2"
                    label="Cases |"
                    type="checkbox"
                    name="group1"
                    id="1"
                /> 
                <Form.Check
                    className="d-inline-block mx-1"
                    label="Clients |"
                    type="checkbox"
                    name="group1"
                    id="1"
                />     
                <Form.Check
                    className="d-inline-block mx-1"
                    label="Staff |"
                    type="checkbox"
                    name="group1"
                    id="1"
                />      
                <Form.Check
                    className="d-inline-block mx-1"
                    label="Notes |"
                    type="checkbox"
                    name="group1"
                    id="1"
                />     
                <Form.Check
                    className="d-inline-block mx-1"
                    label="Safeguarding |"
                    type="checkbox"
                    name="group1"
                    id="1"
                />     
                <Form.Check
                    className="d-inline-block mx-1"
                    label="Articles"
                    type="checkbox"
                    name="group1"
                    id="1"
                />     
                            [there needs to be a search by person somewhere]

                <br />
                <Button size="lg" className="my-3">📥 Submit Form</Button>

            </Form>
            <Card className={`card-dark shadow p-2`}>

                <h3>There are x matches for your search result.</h3>
                

            <Table striped bordered hover responsive>
      <thead>
        <tr>
            

          <th>📁 Type</th>
          <th>📅 Date</th>

          <th>👤 Person</th>
          <th>ℹ️ Summary</th>
          
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@twitter</td>

        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>@twitter</td>

        </tr>
        <tr>
          <td>3</td>
          <td>@twitter</td>
          <td>Larry the Bird</td>
          <td>@twitter</td>
          <td>@twitter</td>
        </tr>
        
      </tbody>
    </Table>
            {/* <Col sm={3} className={``} >
                <h2>📁 Type</h2>
            </Col>
            <Col sm={3} className={``} >
                <h2>👤 Person</h2>
            </Col>
            <Col sm={5} className={``} >
                <h2>ℹ️ Summary</h2>
            </Col>
            <Col sm={1} className={``} >
                <h2>🔗 Link</h2>
            </Col>

            </Row> */}

            </Card>
            
            </Container>}/>)}