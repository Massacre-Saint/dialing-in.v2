/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import { BiBookReader } from 'react-icons/bi';
import { AiOutlineHome } from 'react-icons/ai';
import { FiLogIn, FiHeart } from 'react-icons/fi';
import { useAuth } from '../utils/context/authContext';
import SettingsModal from './modal/SettingsModal';

export default function MainNavBar() {
  const { user } = useAuth();
  const handleClick = (e) => {
    console.warn(e.target.id);
  };

  return (
    <Navbar className="main-nav" onClickCapture={handleClick} fixed="bottom" collapseOnSelect expand="true">
      {
        user
          ? (
            <Container>
              <Nav.Link href="/read/recipes/userRecipes" className="nav-item">
                <BiBookReader id="user-recipe" />
                Recipes
              </Nav.Link>
              <Nav.Link id="home" className="nav-item">
                <AiOutlineHome />
                Home
              </Nav.Link>
              <Nav.Link id="fav" href="/read/recipes/saved" className="nav-item">
                <FiHeart />
                Favorites
              </Nav.Link>
              <Nav.Link className="nav-item">
                <SettingsModal />
                Settings
              </Nav.Link>
            </Container>
          )
          : (
            <Container>
              <Nav.Link href="/" className="nav-item">
                <AiOutlineHome />
                Home
              </Nav.Link>
              <Nav.Link href="/settings" className="nav-item">
                <FiLogIn />
                Login
              </Nav.Link>
            </Container>
          )
      }
    </Navbar>
  );
}
