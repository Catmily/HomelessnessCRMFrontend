import { ReactNode } from "react";
import { Container } from "react-bootstrap";
import Footer from "../components/footer";
import NavBar, { SubNavBar, SecondNavBarTime } from "../components/navbar";

type Props = {
    content: ReactNode;
    
}

export default function StandardLayout({ content}: Props ) {
    return (<Container fluid className={`p-0 g-0`}><NavBar /><SubNavBar />
    <SecondNavBarTime /><Container fluid className={`p-0 g-0`}>{content}</Container><Footer /></Container>)
}