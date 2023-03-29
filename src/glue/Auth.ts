import axios, {isCancel, AxiosError} from 'axios';
import { useJwt } from "react-jwt";
import { isExpired, decodeToken } from "react-jwt";

export function hasJWT() : boolean {
    // ? flag=true : flag=false
    let valid = false;
    const token = localStorage.getItem("access_token_cookie") 
    if (token) {
        const decodedToken = decodeToken(token);
        const isMyTokenExpired = isExpired(token);

        if (!isMyTokenExpired) { valid = true }}
    return valid;
}

export function decodedToken() {
    const token = localStorage.getItem("access_token_cookie") 
    if (token) {
        const decodedToken = decodeToken(token);
        return decodedToken
    }
    return null
}


export function getTokenUser() : string {
    //Ignored = sub will _always_ be present in the JWT
    //@ts-ignore
    return decodedToken()['lgn']
}

export function getPersonId() : string {
    //Ignored = sub will _always_ be present in the JWT
    //@ts-ignore
    return decodedToken()['perId']
}

export async function loginBackend(login: string, password: string) {

    const res = await axios.put('http://localhost/api/login', {login: login, password: password})
    localStorage.setItem('access_token_cookie', res.data['access_token']);
}

export async function changePassword(c: string, pOne: string, pTwo: string)
{
    const res = await axios.put('http://localhost/api/change-password', {login: getTokenUser(), 
    "currentPassword": c, 
    "passwordOne": pOne,
    "passwordTwo": pTwo}, )

}

// an attempt was made to set a default header
// it did not work
// why is life so hard
export function addTokenHeader() {
    return {'Authorization': `Bearer ${localStorage.getItem('access_token_cookie')}`}
}