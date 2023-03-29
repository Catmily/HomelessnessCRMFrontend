import { Container } from "react-bootstrap";
import StandardLayout from "../layouts/standardLayout";

export default function FourOhFour() {
    return <StandardLayout content={<Container className="p-4 main-content shadow align-center">
        <img height="150px" src={require("../assets/tardis404.png")}></img>
        <br /><br />
        <h1>404 - Page Not Found</h1>
        <br />
        <h2>Oh no, this page doesn't exist!</h2>
    <p>Make sure you are <a href="/login">signed in</a>, or alternatively, it really doesn't exist. <br /><span className="bold">Perhaps it's due to some wibbly wobbly timey wimey stuff.</span> </p></Container>}/>
}