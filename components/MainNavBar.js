/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container,
} from 'react-bootstrap';
import { BiBookReader } from 'react-icons/bi';
import { AiOutlineHome, AiOutlineHeart } from 'react-icons/ai';
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
              <Link passHref href="/read/recipes/userRecipes" className="nav-item">
                <BiBookReader color="eb5e28" size={30} id="user-recipe" />
              </Link>
              <Link passHref href="/read/recipes/favRecipes" className="nav-item">
                <AiOutlineHeart color="eb5e28" size={30} />
              </Link>
              <Link passHref href="/" id="home" className="nav-item">
                <AiOutlineHome color="eb5e28" size={30} />
              </Link>
              <Link passHref href="/settings" className="nav-item">
                <SettingsModal />
              </Link>
            </Container>
          )
          : (
            <Container>
              <Link passHref href="/" className="nav-item">
                <AiOutlineHome color="eb5e28" size={30} />
              </Link>
              <Link passHref href="/settings" className="nav-item">
                <FiLogIn color="eb5e28" size={30} />
              </Link>
            </Container>
          )
      }
    </Navbar>
  );
}
