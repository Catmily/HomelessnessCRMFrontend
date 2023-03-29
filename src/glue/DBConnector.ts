import axios from "axios"
import { useParams } from "react-router-dom";
import { addTokenHeader } from './Auth';


export async function GetUserProfile(personID?: string) {

    const res = await axios.put('http://localhost/api/person/get', {person_id: personID}, {headers: addTokenHeader()})
    return res
}

export async function GetPersonSensitive(personID?: string) {

    const res = await axios.put('http://localhost/api/person/sensitive/get', {person_id: personID}, {headers: addTokenHeader()})
    console.log(res)
    return res
}

export async function SetPersonSensitiveProfile(userDetails: Object) {
    console.log("setting details")
    const res = await axios.put('http://localhost/api/person/sensitive', userDetails, {headers: addTokenHeader()})
    console.log(res)
    return res
}

export async function SetUserProfile(userDetails: Object) {
    console.log("setting details")
    const res = await axios.put('http://localhost/api/person', userDetails, {headers: addTokenHeader()})
    console.log(res)
    return res
}

export async function GetCases(case_worker_id?: string) {

    //@ts-ignore
    const res = await axios.put('http://localhost/api/cases/get', {case_worker_id: case_worker_id}, {headers: addTokenHeader()})
    console.log(res)
    return res
}

export async function GetFullCase(case_id?: string) {
    //@ts-ignore
    const res = await axios.put('http://localhost/api/case/get', {case_id: case_id}, {headers: addTokenHeader()})
    return res
}

export async function ChangeCase(caseDetails: Object) {
    console.log(caseDetails)
    const res = await axios.put('http://localhost/api/case', caseDetails, {headers: addTokenHeader()})
    console.log(res)
    return res
}

export async function AddNote(noteDetails: Object) {
    const res = await axios.put('http://localhost/api/note', noteDetails, {headers: addTokenHeader()})
    console.log(res)
    return res
}

export async function GetDocuments(personID: string) {
    const res = await axios.put('http://localhost/api/doc/get', {person_id: personID}, {headers: addTokenHeader()})
    console.log(res)
    return res
}

export async function UploadDocument(document, documentDetails: Object) {
    // const form = new FormData();
    // form.append('file', document);

    //@ts-ignore
    //form.append("info", documentDetails);

    let headers = addTokenHeader();
    headers["Content-Type"] = 'multipart/form-data'

    const res = await axios.post('http://localhost/api/doc', {file: document, info: documentDetails}, {headers: headers})
    console.log(res)
    return res
}



export async function GetPersonNotes(personID: string) {
    const res = await axios.put('http://localhost/api/note/get', {person_id: personID}, {headers: addTokenHeader()})
    console.log(res)
    return res
}




