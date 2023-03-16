import { Form, Row, Col } from "react-bootstrap";

export default function SearchBar() 
{
    return(<Form>
                                    
    <Row>
        <Col><span>Search by keyword:</span><Form.Control type="text" placeholder="Keyword" /></Col>

        <Col><span>Search by start date:</span><Form.Control type="date" placeholder="Start Date" /></Col>

        <Col><span>Search by end date:</span><Form.Control type="date" placeholder="End Date" /></Col>
    </Row>
</Form>)
}