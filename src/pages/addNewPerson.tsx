import { Container } from "react-bootstrap";
import { CaseDetails } from "../components/caseDetails";
import StandardLayout from "../layouts/standardLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetUserProfile } from "../glue/DBConnector";
import BasicInformationDetails from "../components/basicInformationDetails";

export function AddNewPerson() {
  let { id } = useParams();
  const [person, setPerson] = useState<Object>();
  const [personName, setPersonName] = useState("");

  return (
    <StandardLayout
      content={
        <Container className={`p-4 main-content shadow mt-4 mb-4`}>
          <h1>Add New Person</h1>
          <>
            <BasicInformationDetails editMode={true} user={undefined} />
          </>
        </Container>
      }
    />
  );
}
