import { useCallback, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Icon from "../components/logo";
import { changePassword, loginBackend } from "../glue/Auth";
import { useNavigate } from "react-router-dom";
import PasswordStrengthBar from 'react-password-strength-bar';

export default function Login() {
    const [login, setLogin] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate();


    async function onLogin(){
      await loginCall(login, password); 
      navigate('/')
    }

    const onChangeLogin = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setLogin(event.target.value);
    }, []);

    const onChangePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    }, []);

    return <Container fluid className={`login-content fade-in`}>
        <Form className={`login-dialog shadow`}>
        <Icon />
        <h1 className="py-2">Sign into Homeless Check</h1>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter your username..." onChange={onChangeLogin}/>

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter your password..." onChange={onChangePassword}/>
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remember me" />
      </Form.Group> */}

      <Button variant="primary" type="button" className="mx-auto" onClick={async () => onLogin()}>
      🔓 Login to Homeless Check
      </Button>

      <Button variant="secondary" type="button" href="/register" className="mx-2">
        Register an Account
      </Button>

      <Button variant="secondary" type="button" href="/" className="mx-auto">
        Return to Homepage
      </Button>

      
    </Form>


    </Container>
}

export function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState<string>("")
  const [passwordOne, setPasswordOne] = useState<string>("")
  const [passwordTwo, setPasswordTwo] = useState<string>("")


  const onChangeCurrentPassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(event.target.value);
  }, []);

  const onChangePasswordOne = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordOne(event.target.value);
  }, []);

  const onChangePasswordTwo = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordTwo(event.target.value);
  }, []);

  return (<Container fluid className={`login-content fade-in`}>
  <Form className={`login-dialog shadow`}>
  <Icon />
  <h1 className="py-2">Homeless Check | Change Password</h1>

  <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Current Password</Form.Label>
        <Form.Control type="password" placeholder="Enter your current password..." onChange={onChangeCurrentPassword}/>

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>New Password</Form.Label>
        
        <Form.Control type="password" placeholder="Enter your new password..." onChange={onChangePasswordOne}/>
        <PasswordStrengthBar password={passwordOne} />

      </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>New Password (Again)</Form.Label>
        <Form.Control type="password" placeholder="Enter your new password..." onChange={onChangePasswordTwo}/>
      </Form.Group>

      <Button onClick={async () => {await changePassword(currentPassword, passwordOne, passwordTwo);}} variant="primary" type="button" className="mx-auto">
      🔒 Change Password
      </Button>

      <Button variant="secondary" type="button" href="/" className="mx-2">
        Back
      </Button>
</Form>
</Container>)
}

export async function loginCall(login: string, password: string) {
  await loginBackend(login, password)
  
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


      <Button variant="primary" type="button" className="mx-auto">
      🗒️ Register at Homeless Check
      </Button>


      <Button variant="secondary" type="button" href="/login" className="mx-2">
        Return to Login
      </Button>

      <Button variant="secondary" type="button" href="/" className="mx-auto">
        Back
      </Button>
    </Form>
    
    </Container>
}