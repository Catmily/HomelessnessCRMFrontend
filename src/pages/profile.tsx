import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import BasicInformationDetails from "../components/basicInformationDetails";
import Footer from "../components/footer";
import { getPersonId } from "../glue/Auth";
import HomepageLayout from "../layouts/homepageLayout";
import StandardLayout from "../layouts/standardLayout";

type Props = {
  userID?: any;
  self?: boolean;
  hasCase: boolean;
};

export function Profile({ userID, self, hasCase }: Props) {
  let { id } = useParams();
  if (self) {
    id = getPersonId();
  }

  return (
    <StandardLayout
      content={
        <>
          <BasicInformationDetails user={id} editMode={false} />
        </>
      }
    />
  );
}
