import { useCallback, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import Icon from '../components/logo';
import { changePassword, loginBackend } from '../glue/Auth';
import { useNavigate } from 'react-router-dom';
import PasswordStrengthBar from 'react-password-strength-bar';
import { RegisterAccount } from '../glue/DBConnector';

export default function Login () {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  async function onLogin () {
    try {
      await loginCall(login, password);
      navigate('/');
    } catch (e) {
      alert('Error: Could not login.')
    }
  }

  const onChangeLogin = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLogin(event.target.value);
    },
    []
  );

  const onChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    []
  );

  return (
    <Container fluid className={'login-content fade-in'}>
      <Form className={'login-dialog shadow'}>
        <Icon />
        <h1 className='py-2'>Sign into Homeless Check</h1>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='user'>Username</Form.Label>
          <Form.Control
            id='user'
            type='text'
            placeholder='Enter your username...'
            onChange={onChangeLogin}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            id='password'
            type='password'
            placeholder='Enter your password...'
            onChange={onChangePassword}
          />
        </Form.Group>

        <Button
          variant='primary'
          type='button'
          className='mx-auto'
          onClick={async () => { await onLogin(); }}
        >
          🔓 Login to Homeless Check
        </Button>

        <Button
          variant='secondary'
          type='button'
          href='/register'
          className='mx-2'
        >
          Register an Account
        </Button>

        <Button variant='secondary' type='button' href='/' className='mx-auto'>
          Return to Homepage
        </Button>
      </Form>
    </Container>
  );
}

export function ChangePassword () {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [passwordOne, setPasswordOne] = useState<string>('');
  const [passwordTwo, setPasswordTwo] = useState<string>('');

  const onChangeCurrentPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPassword(event.target.value);
    },
    []
  );

  const onChangePasswordOne = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordOne(event.target.value);
    },
    []
  );

  const onChangePasswordTwo = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordTwo(event.target.value);
    },
    []
  );

  return (
    <Container fluid className={'login-content fade-in'}>
      <Form className={'login-dialog shadow'}>
        <Icon />
        <h1 className='py-2'>Homeless Check | Change Password</h1>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='curr_pass'>Current Password</Form.Label>
          <Form.Control
            id='curr_pass'
            type='password'
            placeholder='Enter your current password...'
            onChange={onChangeCurrentPassword}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='new_pass'>New Password</Form.Label>

          <Form.Control
            id='new_pass'
            type='password'
            placeholder='Enter your new password...'
            onChange={onChangePasswordOne}
          />
          <PasswordStrengthBar password={passwordOne} />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='new_pass_again'>New Password (Again)</Form.Label>
          <Form.Control
            id='new_pass_again'
            type='password'
            placeholder='Enter your new password...'
            onChange={onChangePasswordTwo}
          />
        </Form.Group>
        <p>Your password needs at least one uppercase letter, one lowercase letter, one symbol, and must be more than 8 characters.</p>

        <Button
          onClick={async () => {
            if (passwordOne !== passwordTwo) {
              alert('Passwords are not the same!')
            }

            if (passwordOne === '' || passwordTwo === '') {
              alert('Passwords cannot be blank!')
            }
            if (!passwordOne.match('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')) {
              alert('Password not strong enough!')

              await changePassword(currentPassword, passwordOne, passwordTwo);
            }
          }}
          variant='primary'
          type='button'
          className='mx-auto'
        >
          🔒 Change Password
        </Button>

        <Button variant='secondary' type='button' href='/' className='mx-2'>
          Back
        </Button>
      </Form>
    </Container>
  );
}

export async function loginCall (login: string, password: string) {
  await loginBackend(login, password);
}

export function Register () {
  const [login, setLogin] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onChangeLogin = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLogin(event.target.value);
    },
    []
  );

  const onChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    []
  );

  const onChangeEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    []
  );

  return (
    <Container fluid className={'login-content fade-in'}>
      <Form className={'login-dialog shadow'}>
        <Icon />
        <h1 className='py-2'>Register at Homeless Check</h1>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='user'>Username</Form.Label>
          <Form.Control
            id='user'
            onChange={onChangeLogin}
            type='email'
            placeholder='Enter a username...'
          />
        </Form.Group>

        <Form.Group className='mb-3 '>
          <Form.Label htmlFor='email'>Email Address</Form.Label>
          <Form.Control
            id='email'
            onChange={onChangeEmail}
            type='email'
            placeholder='Enter an email address...'
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='pass'>Password</Form.Label>
          <Form.Control
            id='pass'
            onChange={onChangePassword}
            type='password'
            placeholder='Enter a password...'
          />
        </Form.Group>
        <PasswordStrengthBar password={password} />

        <p>Your password needs at least one uppercase letter, one lowercase letter, one symbol, and must be more than 8 characters.</p>

        <Button
          variant='primary'
          type='button'
          className='mx-auto'
          onClick={async () => {
            // https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
            // appropriate regex
            if (!password.match('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')) {
              alert('Password not strong enough!')
            }
            if (login === '') {
              alert('User cannot be blank!')
            }

            try {
              await RegisterAccount(login, email, password);
            } catch (e) {
              alert("Can't register account. You have not been registered.")
            }
          }}
        >
          🗒️ Register at Homeless Check
        </Button>

        <Button
          variant='secondary'
          type='button'
          href='/login'
          className='mx-2'
        >
          Return to Login
        </Button>

        <Button variant='secondary' type='button' href='/' className='mx-auto'>
          Back
        </Button>
      </Form>
    </Container>
  );
}
