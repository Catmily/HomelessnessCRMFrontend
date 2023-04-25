import { Container } from "react-bootstrap";
import { CaseDetails } from "../components/caseDetails";
import StandardLayout from "../layouts/standardLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetUserProfile } from "../glue/DBConnector";

export function AddNewCase() {
  let { id } = useParams();
  const [person, setPerson] = useState<Object>();
  const [personName, setPersonName] = useState("");

  useEffect(() => {
    const func = async () => {
      //@ts-ignore
      const res = await GetUserProfile(id);

      setPerson(res["data"]["message"][0]);
      setPersonName(res["data"]["message"][0]["preferred_name"]);
    };
    func();
  }, []);

  return (
    <StandardLayout
      content={
        <Container className={`p-4 main-content shadow mt-4 mb-4`}>
          <h1>Add New Case - {personName} </h1>
          <CaseDetails
            editMode={true}
            caseDetails={{
              person_id: parseInt(id),
              summary: "No case details provided.",
            }}
          />
        </Container>
      }
    />
  );
}
