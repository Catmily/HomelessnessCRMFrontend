/* eslint-disable object-shorthand */
// API calls need a specific format, lol

import axios, { type AxiosResponse } from 'axios';
import fileDownload from 'js-file-download';
import { addTokenHeader } from './Auth';

export async function RegisterAccount (
  login: string,
  email: string,
  password: string): Promise<AxiosResponse<any, any>> {
  const res = await axios.put(
    'http://localhost/api/register',
    { login: login, password: password, email: email },
    { headers: addTokenHeader() }
  );
  return res;
}

export async function GetUserProfile (personId?: string): Promise<AxiosResponse<any, any>> {
  const res = await axios.put(
    'http://localhost/api/person/get',
    { person_id: personId },
    { headers: addTokenHeader() }
  );
  return res;
}

export async function GetKeysDB (models): Promise<AxiosResponse<any, any>> {
  const res = await axios.put(
    'http://localhost/api/keys/get',
    { models },
    { headers: addTokenHeader() }
  );
  return res;
}

export async function GetStats (): Promise<AxiosResponse<any, any>> {
  const res = await axios.put('http://localhost/api/stats');
  return res;
}

export async function HasCase (personId: string): Promise<boolean> {
  const res = await axios.put(
    'http://localhost/api/query/contains/case',
    { person_id: personId },
    { headers: addTokenHeader() }
  );
  if (res.status === 204) {
    return false;
  } else {
    return true;
  }
}
export async function IsCaseWorker (personId: string): Promise<boolean> {
  const res = await axios.put(
    'http://localhost/api/query/contains/caseworker',
    { person_id: personId },
    { headers: addTokenHeader() }
  );
  if (res.status === 204) {
    return false;
  } else {
    return true;
  }
}
export async function IsSupervisor (personId: string) {
  const res = await axios.put(
    'http://localhost/api/query/contains/supervisor',
    { person_id: personId },
    { headers: addTokenHeader() }
  );

  if (res.status === 204) {
    return false;
  } else {
    return true;
  }
}

export async function SupervisorPerms (personId: string, add: boolean): Promise<AxiosResponse<any, any>> {
  const res = await axios.put(
    'http://localhost/api/person/set/supervisor',
    { person_id: personId, add: add },
    { headers: addTokenHeader() }
  );

  return res;
}

export async function CaseWorkerPerms (personId: string, add: boolean): Promise<AxiosResponse<any, any>> {
  const res = await axios.put(
    'http://localhost/api/person/set/caseworker',
    { person_id: personId, add: +add },
    { headers: addTokenHeader() }
  );

  return res;
}

export async function AddCaseWorkerToCase (personId: string, caseId: string): Promise<AxiosResponse<any, any>> {
  const res = await axios.put(
    'http://localhost/api/case/add-caseworker',
    { person_id: personId, case_id: caseId },
    { headers: addTokenHeader() }
  );
  return res;
}

export async function RemoveCaseWorkerFromCase (caseId: string): Promise<AxiosResponse<any, any>> {
  const res = await axios.put(
    'http://localhost/api/case/remove-caseworker',
    { case_id: caseId },
    { headers: addTokenHeader() }
  );
  return res;
}

export async function GetPersonSensitive (personId?: string): Promise<AxiosResponse<any, any>> {
  const res = await axios.put(
    'http://localhost/api/person/sensitive/get',
    { person_id: personId },
    { headers: addTokenHeader() }
  );

  return res;
}

export async function SetPersonSensitiveProfile (userDetails: Record<string, unknown>): Promise<AxiosResponse<any, any>> {
  const res = await axios.put(
    'http://localhost/api/person/sensitive',
    userDetails,
    { headers: addTokenHeader() }
  );

  return res;
}

export async function SetUserProfile (userDetails: Record<string, unknown>): Promise<AxiosResponse<any, any>> {
  const res = await axios.put('http://localhost/api/person', userDetails, {
    headers: addTokenHeader()
  });

  return res;
}

export async function SetUserProfileAdd (userDetails: Record<string, unknown>): Promise<AxiosResponse<any, any>> {
  const res = await axios.put('http://localhost/api/person/add', userDetails, {
    headers: addTokenHeader()
  });

  return res;
}
export async function GetCases (caseWorkerId?: string): Promise<AxiosResponse<any, any>> {
  const res = await axios.put(
    'http://localhost/api/cases/get',
    { case_worker_id: caseWorkerId },
    { headers: addTokenHeader() }
  );

  return res;
}

export async function GetCasesGeneric (searchQueries: Record<string, unknown>): Promise<AxiosResponse<any, any>> {
  const res = await axios.put(
    'http://localhost/api/search/case',
    searchQueries,
    { headers: addTokenHeader() }
  );

  return res;
}

export async function GetNotesGeneric (searchQueries: Record<string, unknown>): Promise<AxiosResponse<any, any>> {
  const res = await axios.put(
    'http://localhost/api/search/note',
    searchQueries,
    { headers: addTokenHeader() }
  );

  return res;
}

export async function GetPeopleGeneric (searchQueries: Record<string, unknown>): Promise<AxiosResponse<any, any>> {
  const res = await axios.put(
    'http://localhost/api/search/person',
    searchQueries,
    { headers: addTokenHeader() }
  );

  return res;
}

export async function GetCaseWorkersGeneric (searchQueries: Record<string, unknown>): Promise<AxiosResponse<any, any>> {
  const res = await axios.put(
    'http://localhost/api/search/caseworker',
    searchQueries,
    { headers: addTokenHeader() }
  );

  return res;
}

export async function GetDocumentsGeneric (searchQueries: Record<string, unknown>): Promise<AxiosResponse<any, any>> {
  const res = await axios.put(
    'http://localhost/api/search/doc',
    searchQueries,
    { headers: addTokenHeader() }
  );

  return res;
}

export async function GetFullCase (caseId?: string): Promise<AxiosResponse<any, any>> {
  const res = await axios.put(
    'http://localhost/api/case/get',
    { case_id: caseId },
    { headers: addTokenHeader() }
  );
  return res;
}

export async function ChangeCase (caseDetails: Record<string, unknown>): Promise<AxiosResponse<any, any>> {
  const res = await axios.put('http://localhost/api/case', caseDetails, {
    headers: addTokenHeader()
  });

  return res;
}

export async function RemoveCase (caseId: number): Promise<AxiosResponse<any, any>> {
  const res = await axios.delete('http://localhost/api/case', {
    data: { case_id: caseId },
    headers: addTokenHeader()
  });
  return res;
}

export async function RemovePerson (personId: string): Promise<AxiosResponse<any, any>> {
  const res = await axios.delete('http://localhost/api/person', {
    data: { person_id: personId },
    headers: addTokenHeader()
  });
  return res;
}

export async function RemoveNote (noteId: string): Promise<AxiosResponse<any, any>> {
  const res = await axios.delete('http://localhost/api/note', {
    data: { note_id: noteId },
    headers: addTokenHeader()
  });
  return res;
}

export async function RemoveSafeguardingNote (noteId: string): Promise<AxiosResponse<any, any>> {
  const res = await axios.delete('http://localhost/api/safeguarding', {
    data: { note_id: noteId },
    headers: addTokenHeader()
  });
  return res;
}

export async function RemoveDoc (documentId: string): Promise<AxiosResponse<any, any>> {
  const res = await axios.delete('http://localhost/api/doc', {
    data: { document_id: documentId },
    headers: addTokenHeader()
  });
  return res;
}

export async function AddNote (noteDetails: Record<string, unknown>): Promise<AxiosResponse<any, any>> {
  const res = await axios.put('http://localhost/api/note', noteDetails, {
    headers: addTokenHeader()
  });

  return res;
}

export async function AddSafeguardingNote (safeguardNoteDetails: Record<string, unknown>): Promise<AxiosResponse<any, any>> {
  const res = await axios.put(
    'http://localhost/api/safeguarding/add',
    safeguardNoteDetails,
    { headers: addTokenHeader() }
  );

  return res;
}

export async function GetDocuments (personId: string): Promise<AxiosResponse<any, any>> {
  const res = await axios.put(
    'http://localhost/api/docs/get',
    { person_id: personId },
    { headers: addTokenHeader() }
  );

  return res;
}

export async function GetDocument (documentID: string): Promise<void> {
  const res = await axios.put(
    'http://localhost/api/doc/get',
    { document_id: documentID },
    { headers: addTokenHeader(), responseType: 'blob' }
  );

  fileDownload(
    res['data'],
    res['headers']['content-disposition'].replace('attachment; filename=', '')
  );
}

export async function GetDocumentInfo (documentID: string): Promise<AxiosResponse<any, any>> {
  const res = await axios.put(
    'http://localhost/api/info/get',
    { document_id: documentID },
    { headers: addTokenHeader() }
  );
  return res;
}

export async function UploadDocument (document, documentDetails: Record<string, unknown>): Promise<AxiosResponse<any, any>> {
  const headers = addTokenHeader();
  headers['Content-Type'] = 'multipart/form-data';

  const res = await axios.post(
    'http://localhost/api/doc',
    { file: document, info: documentDetails },
    { headers: headers }
  );

  return res;
}

export async function GetPersonNotes (personId: string): Promise<AxiosResponse<any, any>> {
  const res = await axios.put(
    'http://localhost/api/note/get',
    { person_id: personId },
    { headers: addTokenHeader() }
  );

  return res;
}

export async function GetSafeguardingNotes (personId: string): Promise<AxiosResponse<any, any>> {
  const res = await axios.put(
    'http://localhost/api/safeguarding/get',
    { person_id: personId },
    { headers: addTokenHeader() }
  );

  return res;
}

export async function WholePersonExport (personId: string): Promise<AxiosResponse<any, any>> {
  const res = await axios.put(
    'http://localhost/api/export/get',
    { person_id: personId },
    { headers: addTokenHeader(), responseType: 'blob' }
  );
  fileDownload(
    res['data'],
    res['headers']['content-disposition'].replace('attachment; filename=', '')
  );
  return res;
}
