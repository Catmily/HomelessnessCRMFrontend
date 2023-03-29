
import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { getTokenUser } from "../glue/Auth";
import { currentNavBarTime, currentNavBarDate } from "../glue/NavBarTime";
import Icon from './logo';

export default function NavBar() : JSX.Element {
    return (
    <Navbar className="py-4" collapseOnSelect expand="sm" bg="light" variant="light" id="nav1">
    <Container className="`navbarContainer`">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Navbar.Brand href="#home"><Icon /></Navbar.Brand>

        <Nav className="me-auto">


        </Nav>
        <Nav>

        <NavDropdown title="User" id="collasible-nav-dropdown" className="my-auto">
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="/profile/change-password">
              Change Password
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/logout">
              Logout
            </NavDropdown.Item>
          </NavDropdown>

        </Nav>
      </Navbar.Collapse>

    </Container>
  </Navbar>)
}

export function SubNavBar() {
  return (<Navbar className="py-2" collapseOnSelect expand="sm" bg="light" variant="light">
  <Container className="`navbarContainer`">
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">


      <Nav className="me-auto">
      <Nav.Link href="/cases">Cases</Nav.Link>
      <Nav.Link href="/search">Search</Nav.Link>
      <Nav.Link href="/metrics">Metrics</Nav.Link>
      <Nav.Link href="/safeguarding">Safeguarding</Nav.Link>
      <Nav.Link href="/resources">Resources</Nav.Link>


      </Nav>

    </Navbar.Collapse>

  </Container>
</Navbar>)
}


export function SecondNavBarTime() : JSX.Element  {
  const [time, setTime] = useState(currentNavBarTime())

  useEffect(() => {
    const repeat = setInterval(() => setTime(currentNavBarTime()), 500);
  }, [time]);

  return (<>
  <Navbar collapseOnSelect expand="sm" bg="success" variant="dark" id="nav2" className="shadow">
  <Container>
  <><span className={`almost-white`}><span className={`bold`}>📒 Logged in as:</span> {getTokenUser()}</span></>

  <NavDropdown.Divider />
    <Navbar.Text>
  <><span className={`almost-white`}><span className={`bold`}>🕑 Current time/date:</span> { currentNavBarDate() } { currentNavBarTime() }</span></>
  </Navbar.Text>

  </Container>
</Navbar></>)
}


