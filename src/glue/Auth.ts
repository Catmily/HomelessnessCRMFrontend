/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { isExpired, decodeToken } from 'react-jwt';

export function hasJWT (): boolean {
  // ? flag=true : flag=false
  let valid = false;
  const token = localStorage.getItem('access_token_cookie');
  if (token) {
    // const decodedToken = decodeToken(token);
    const isMyTokenExpired = isExpired(token);

    if (!isMyTokenExpired) {
      valid = true;
    }
  }
  return valid;
}

export function decodedToken (): any {
  const token = localStorage.getItem('access_token_cookie');
  if (token) {
    const decodedToken = decodeToken(token);
    return decodedToken;
  }
  return null;
}

export function getTokenUser (): string {
  return decodedToken()['lgn'];
}

export function isJWTCaseWorker (): string {
  const role = decodedToken()['role_cw'];
  if (role) {
    return decodedToken()['role_cw'];
  } else {
    return null;
  }
}

export function isJWTSupervisor (): string {
  const role = decodedToken()['role_sv'];
  if (role) {
    return decodedToken()['role_sv'];
  } else {
    return null;
  }
}

export function getPersonId (): string {
  return decodedToken()['perId'];
}

export async function loginBackend (login: string, password: string): Promise<void> {
  const res = await axios.put('https://homelesscrm.com/api/login', {
    login,
    password
  });
  localStorage.setItem('access_token_cookie', res.data['access_token']);
}

export async function changePassword (c: string, pOne: string, pTwo: string): Promise<void> {
  const res = await axios.put(
    'https://homelesscrm.com/api/change-password',
    {
      login: getTokenUser(),
      currentPassword: c,
      passwordOne: pOne,
      passwordTwo: pTwo
    },
    { headers: addTokenHeader() }
  );
}

// an attempt was made to set a default header
// it did not work
// why is life so hard
export function addTokenHeader (): Record<string, string> {
  return {
    Authorization: `Bearer ${localStorage.getItem('access_token_cookie')}`
  };
}
