import axios from "axios"
import fileDownload from "js-file-download";
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

export async function AddSafeguardingNote(safeguardNoteDetails: Object) {
    const res = await axios.put('http://localhost/api/safeguarding/add', safeguardNoteDetails, {headers: addTokenHeader()})
    console.log(res)
    return res
}

export async function GetDocuments(personID: string) {
    const res = await axios.put('http://localhost/api/docs/get', {person_id: personID}, {headers: addTokenHeader()})
    console.log(res)
    return res
}

export async function GetDocument(documentID: string) {
    
    const res = await axios.put('http://localhost/api/doc/get', {document_id: documentID}, {headers: addTokenHeader(), responseType:"blob"})
    console.log(res["data"])
    console.log()
    const config = {responseType: 'blob'};
    fileDownload(res["data"], res["headers"]["content-disposition"].replace("attachment; filename=", ""));
}


export async function GetDocumentInfo(documentID: string) {
    
    const res = await axios.put('http://localhost/api/info/get', {document_id: documentID}, {headers: addTokenHeader()})
    return res
}


export async function UploadDocument(document, documentDetails: Object) {
    let headers = addTokenHeader();
    headers["Content-Type"] = 'multipart/form-data'

    const res = await axios.post('http://localhost/api/doc', {file: document, info: documentDetails}, {headers: headers})

    return res
}



export async function GetPersonNotes(personID: string) {
    const res = await axios.put('http://localhost/api/note/get', {person_id: personID}, {headers: addTokenHeader()})
    console.log(res)
    return res
}


export async function WholePersonExport(personID: string) {
    const res = await axios.put('http://localhost/api/export/get', {person_id: personID}, {headers: addTokenHeader(), responseType:"blob"})
    const config = {responseType: 'blob'};
    fileDownload(res["data"], res["headers"]["content-disposition"].replace("attachment; filename=", ""));
    return res
}


