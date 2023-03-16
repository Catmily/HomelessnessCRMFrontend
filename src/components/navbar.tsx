
import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { currentNavBarTime, currentNavBarDate } from "../utils/NavBarTime";
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
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
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
      <Nav.Link>Cases</Nav.Link>
      <Nav.Link>Search</Nav.Link>
      <Nav.Link>Metrics</Nav.Link>
      <Nav.Link>Safeguarding</Nav.Link>
      <Nav.Link>Resources</Nav.Link>


      </Nav>

    </Navbar.Collapse>

  </Container>
</Navbar>)
}


export function SecondNavBarTime() : JSX.Element  {
  const [time, setTime] = useState(currentNavBarTime())

  useEffect(() => {
    const repeat = setInterval(() => setTime(currentNavBarTime()), 500);
  }, []);

  return (<>
  <Navbar collapseOnSelect expand="sm" bg="success" variant="dark" id="nav2" className="shadow">
  <Container>
  <><span className={`almost-white`}><span className={`bold`}>📒 Logged in as:</span> User</span></>

  <NavDropdown.Divider />
    <Navbar.Text>
  <><span className={`almost-white`}><span className={`bold`}>🕑 Current time/date:</span> { currentNavBarDate() } { currentNavBarTime() }</span></>
  </Navbar.Text>

  </Container>
</Navbar></>)
}


