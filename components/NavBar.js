/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import { BiBookReader } from 'react-icons/bi';
import { MdOutlineCoffeeMaker } from 'react-icons/md';
import { GrFavorite, GrUserSettings } from 'react-icons/gr';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();
  return (
    <Navbar fixed="bottom" collapseOnSelect expand="true" bg="transparent" variant="dark">
      {
        user
          ? (
            <Container>
              <Nav.Link href="/">
                <BiBookReader />
              </Nav.Link>
              <Nav.Link href="/">
                <MdOutlineCoffeeMaker />
              </Nav.Link>
              <Nav.Link href="/">
                <GrFavorite />
              </Nav.Link>
              <Nav.Link href="/settings">
                <GrUserSettings />
              </Nav.Link>
            </Container>
          )
          : (
            <Container>
              <Nav.Link href="/">
                <MdOutlineCoffeeMaker />
              </Nav.Link>
              <Nav.Link href="/settings">
                <GrUserSettings />
              </Nav.Link>
            </Container>
          )
      }
    </Navbar>
  );
}
