import { Container } from "react-bootstrap";
import StandardLayout from "../layouts/standardLayout";

export default function FourOhThree() {
  return (
    <StandardLayout
      content={
        <Container className="p-4 main-content shadow align-center">
          <img height="150px" src={require("../assets/perms.jpg")}></img>
          <br />
          <br />
          <h1>403 - Not Enough Permissions</h1>
          <br />
          <h2>Oh no, you don't have permissions for that!</h2>
          <p>
            Make sure you are <a href="/login">signed in</a> to the right
            account, or alternatively, ask your manager or system admin. <br />
            <span className="bold">
              Perhaps it's due to some wibbly wobbly timey wimey stuff.
            </span>{" "}
          </p>
        </Container>
      }
    />
  );
}
