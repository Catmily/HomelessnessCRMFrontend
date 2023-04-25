import axios from "axios";
import fileDownload from "js-file-download";
import { useParams } from "react-router-dom";
import { addTokenHeader } from "./Auth";

export async function RegisterAccount(
  login: string,
  email: string,
  password: string
) {
  const res = await axios.put(
    "http://localhost/api/register",
    { login: login, password: password, email: email },
    { headers: addTokenHeader() }
  );
  return res;
}

export async function GetUserProfile(person_id?: string) {
  const res = await axios.put(
    "http://localhost/api/person/get",
    { person_id: person_id },
    { headers: addTokenHeader() }
  );
  return res;
}

//@ts-ignore
export async function GetKeysDB(models) {
  const res = await axios.put(
    "http://localhost/api/keys/get",
    { models },
    { headers: addTokenHeader() }
  );
  return res;
}

export async function GetStats() {
  const res = await axios.put("http://localhost/api/stats");
  return res;
}

export async function HasCase(person_id: string) {
  const res = await axios.put(
    "http://localhost/api/query/contains/case",
    { person_id: person_id },
    { headers: addTokenHeader() }
  );
  if (res.status == 204) {
    return false;
  } else {
    return true;
  }
}
export async function IsCaseWorker(person_id: string) {
  const res = await axios.put(
    "http://localhost/api/query/contains/caseworker",
    { person_id: person_id },
    { headers: addTokenHeader() }
  );
  if (res.status == 204) {
    return false;
  } else {
    return true;
  }
}
export async function IsSupervisor(person_id: string) {
  const res = await axios.put(
    "http://localhost/api/query/contains/supervisor",
    { person_id: person_id },
    { headers: addTokenHeader() }
  );

  if (res.status == 204) {
    return false;
  } else {
    return true;
  }
}

export async function SupervisorPerms(person_id: string, add: boolean) {
  const res = await axios.put(
    "http://localhost/api/person/set/supervisor",
    { person_id: person_id, add: add },
    { headers: addTokenHeader() }
  );

  return res;
}

export async function CaseWorkerPerms(person_id: string, add: boolean) {
  const res = await axios.put(
    "http://localhost/api/person/set/caseworker",
    { person_id: person_id, add: +add },
    { headers: addTokenHeader() }
  );

  return res;
}

export async function GetPersonSensitive(person_id?: string) {
  const res = await axios.put(
    "http://localhost/api/person/sensitive/get",
    { person_id: person_id },
    { headers: addTokenHeader() }
  );

  return res;
}

export async function SetPersonSensitiveProfile(userDetails: Object) {
  const res = await axios.put(
    "http://localhost/api/person/sensitive",
    userDetails,
    { headers: addTokenHeader() }
  );

  return res;
}

export async function SetUserProfile(userDetails: Object) {
  const res = await axios.put("http://localhost/api/person", userDetails, {
    headers: addTokenHeader(),
  });

  return res;
}

export async function SetUserProfileAdd(userDetails: Object) {
  const res = await axios.put("http://localhost/api/person/add", userDetails, {
    headers: addTokenHeader(),
  });

  return res;
}
export async function GetCases(case_worker_id?: string) {
  //@ts-ignore
  const res = await axios.put(
    "http://localhost/api/cases/get",
    { case_worker_id: case_worker_id },
    { headers: addTokenHeader() }
  );

  return res;
}

export async function GetCasesGeneric(search_queries: Object) {
  //@ts-ignore
  const res = await axios.put(
    "http://localhost/api/search/case",
    search_queries,
    { headers: addTokenHeader() }
  );

  return res;
}

export async function GetNotesGeneric(search_queries: Object) {
  //@ts-ignore
  const res = await axios.put(
    "http://localhost/api/search/note",
    search_queries,
    { headers: addTokenHeader() }
  );

  return res;
}

export async function GetPeopleGeneric(search_queries: Object) {
  //@ts-ignore
  const res = await axios.put(
    "http://localhost/api/search/person",
    search_queries,
    { headers: addTokenHeader() }
  );

  return res;
}

export async function GetCaseWorkersGeneric(search_queries: Object) {
  //@ts-ignore
  const res = await axios.put(
    "http://localhost/api/search/caseworker",
    search_queries,
    { headers: addTokenHeader() }
  );

  return res;
}

export async function GetDocumentsGeneric(search_queries: Object) {
  //@ts-ignore
  const res = await axios.put(
    "http://localhost/api/search/doc",
    search_queries,
    { headers: addTokenHeader() }
  );

  return res;
}

export async function GetFullCase(case_id?: string) {
  //@ts-ignore
  const res = await axios.put(
    "http://localhost/api/case/get",
    { case_id: case_id },
    { headers: addTokenHeader() }
  );
  return res;
}

export async function ChangeCase(caseDetails: Object) {
  const res = await axios.put("http://localhost/api/case", caseDetails, {
    headers: addTokenHeader(),
  });

  return res;
}

export async function RemoveCase(case_id: number) {
  const res = await axios.delete("http://localhost/api/case", {
    data: { case_id: case_id },
    headers: addTokenHeader(),
  });
  return res;
}

export async function RemovePerson(person_id: string) {
  const res = await axios.delete("http://localhost/api/person", {
    data: { person_id: person_id },
    headers: addTokenHeader(),
  });
  return res;
}

export async function RemoveNote(note_id: string) {
  const res = await axios.delete("http://localhost/api/note", {
    data: { note_id: note_id },
    headers: addTokenHeader(),
  });
  return res;
}

export async function RemoveDoc(document_id: string) {
  const res = await axios.delete("http://localhost/api/doc", {
    data: { document_id: document_id },
    headers: addTokenHeader(),
  });
  return res;
}

export async function AddNote(noteDetails: Object) {
  const res = await axios.put("http://localhost/api/note", noteDetails, {
    headers: addTokenHeader(),
  });

  return res;
}

export async function AddSafeguardingNote(safeguardNoteDetails: Object) {
  const res = await axios.put(
    "http://localhost/api/safeguarding/add",
    safeguardNoteDetails,
    { headers: addTokenHeader() }
  );

  return res;
}

export async function GetDocuments(person_id: string) {
  const res = await axios.put(
    "http://localhost/api/docs/get",
    { person_id: person_id },
    { headers: addTokenHeader() }
  );

  return res;
}

export async function GetDocument(documentID: string) {
  const res = await axios.put(
    "http://localhost/api/doc/get",
    { document_id: documentID },
    { headers: addTokenHeader(), responseType: "blob" }
  );

  const config = { responseType: "blob" };
  fileDownload(
    res["data"],
    res["headers"]["content-disposition"].replace("attachment; filename=", "")
  );
}

export async function GetDocumentInfo(documentID: string) {
  const res = await axios.put(
    "http://localhost/api/info/get",
    { document_id: documentID },
    { headers: addTokenHeader() }
  );
  return res;
}

export async function UploadDocument(document, documentDetails: Object) {
  let headers = addTokenHeader();
  headers["Content-Type"] = "multipart/form-data";

  const res = await axios.post(
    "http://localhost/api/doc",
    { file: document, info: documentDetails },
    { headers: headers }
  );

  return res;
}

export async function GetPersonNotes(person_id: string) {
  const res = await axios.put(
    "http://localhost/api/note/get",
    { person_id: person_id },
    { headers: addTokenHeader() }
  );

  return res;
}

export async function GetSafeguardingNotes(person_id: string) {
  const res = await axios.put(
    "http://localhost/api/safeguarding/get",
    { person_id: person_id },
    { headers: addTokenHeader() }
  );

  return res;
}

export async function WholePersonExport(person_id: string) {
  const res = await axios.put(
    "http://localhost/api/export/get",
    { person_id: person_id },
    { headers: addTokenHeader(), responseType: "blob" }
  );
  const config = { responseType: "blob" };
  fileDownload(
    res["data"],
    res["headers"]["content-disposition"].replace("attachment; filename=", "")
  );
  return res;
}
