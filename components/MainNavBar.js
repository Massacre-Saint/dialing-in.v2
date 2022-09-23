/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import { BiBookReader } from 'react-icons/bi';
import { AiOutlineHome } from 'react-icons/ai';
import { FiLogIn } from 'react-icons/fi';
import { useAuth } from '../utils/context/authContext';
import SettingsModal from './modal/SettingsModal';

export default function MainNavBar() {
  const { user } = useAuth();

  return (
    <Navbar className="main-nav" fixed="bottom" collapseOnSelect expand="true">
      {
        user
          ? (
            <Container>
              <Nav.Link href="/read/recipes/userRecipes" className="nav-item">
                <BiBookReader id="user-recipe" />
              </Nav.Link>
              <Nav.Link id="home" className="nav-item">
                <AiOutlineHome />
              </Nav.Link>
              <Nav.Link className="nav-item">
                <SettingsModal />
              </Nav.Link>
            </Container>
          )
          : (
            <Container>
              <Nav.Link href="/" className="nav-item">
                <AiOutlineHome />
              </Nav.Link>
              <Nav.Link href="/settings" className="nav-item">
                <FiLogIn />
              </Nav.Link>
            </Container>
          )
      }
    </Navbar>
  );
}
