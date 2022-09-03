/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import { BiBookReader } from 'react-icons/bi';
import { MdOutlineCoffeeMaker } from 'react-icons/md';
import { GrFavorite, GrLogin } from 'react-icons/gr';
import { useAuth } from '../utils/context/authContext';
import SettingsModal from './modal/SettingsModal';

export default function MainNavBar() {
  const { user } = useAuth();
  const handleClick = (e) => {
    console.warn(e.target.id);
  };

  return (
    <Navbar onClickCapture={handleClick} fixed="bottom" collapseOnSelect expand="true" bg="transparent" variant="dark">
      {
        user
          ? (
            <Container>
              <Nav.Link>
                <BiBookReader id="user-recipe" />
              </Nav.Link>
              <Nav.Link id="home">
                <MdOutlineCoffeeMaker />
              </Nav.Link>
              <Nav.Link id="fav">
                <GrFavorite />
              </Nav.Link>
              <Nav.Link>
                <SettingsModal />
              </Nav.Link>
            </Container>
          )
          : (
            <Container>
              <Nav.Link href="/">
                <MdOutlineCoffeeMaker />
              </Nav.Link>
              <Nav.Link href="/settings">
                Login
                <GrLogin />
              </Nav.Link>
            </Container>
          )
      }
    </Navbar>
  );
}
