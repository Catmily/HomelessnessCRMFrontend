import React from "react";
import { Container } from "react-bootstrap";
import HomepageLayout from '../layouts/homepageLayout';
import StandardLayout from '../layouts/standardLayout';

export function Homepage() {
    return (
        <Container fluid className={`p-0 g-0`}>
          <StandardLayout content=<HomepageLayout/> />
          </Container>
          
      );
}