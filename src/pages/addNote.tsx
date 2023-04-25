import { Container, Button } from "react-bootstrap";
import { NoteComponent } from "../components/noteComponent";
import StandardLayout from "../layouts/standardLayout";

export default function AddNote() {
  return (
    <StandardLayout
      content={
        <Container className="p-4 main-content shadow mt-4 mb-4">
          <h1>Add Note</h1>
          <NoteComponent safeguarding={false} />
        </Container>
      }
    />
  );
}
