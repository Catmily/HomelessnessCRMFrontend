import { Button, Container, Form } from "react-bootstrap";
import Icon from "../components/logo";

export default function Login() {
    return <Container fluid className={`login-content fade-in`}>
        <Form className={`login-dialog shadow`}>
        <Icon />
        <h1 className="py-2">Sign into Homeless Check</h1>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="email" placeholder="Enter your username..." />

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter your password..." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remember me" />
      </Form.Group>

      <Button variant="primary" type="submit" className="mx-auto">
      🔓 Login to Homeless Check
      </Button>

      <Button variant="secondary" type="submit" href="/register" className="mx-2">
        Register an Account
      </Button>

      <Button variant="secondary" type="submit" href="/" className="mx-auto">
        Return to Homepage
      </Button>

      
    </Form>


    </Container>
}

export function Register() {
    return <Container fluid className={`login-content fade-in`}>
        <Form className={`login-dialog shadow`}>
        <Icon />
        <h1 className="py-2">Register at Homeless Check</h1>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="email" placeholder="Enter a username..." />

      </Form.Group>
     
      <Form.Group className="mb-3 " controlId="formBasicEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email" placeholder="Enter an email address..." />

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter a password..." />
      </Form.Group>


      <Button variant="primary" type="submit" className="mx-auto">
      🗒️ Register at Homeless Check
      </Button>


      <Button variant="secondary" type="submit" href="/login" className="mx-2">
        Return to Login
      </Button>
    </Form>
    
    </Container>
}