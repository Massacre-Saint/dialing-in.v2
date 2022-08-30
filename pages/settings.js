/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IoIosArrowBack } from 'react-icons/io';
import {
  Button,
  Navbar, Container, Nav,
} from 'react-bootstrap';
import Image from 'next/image';
import { signIn, signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { createUserProfile, getUser } from '../utils/data/apiData/userData';

function Settings() {
  const [, setUserProfile] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const payload = {
    uid: user.uid,
    photoUrl: user.photoURL,
    name: user.displayName,
  };
  const validateUser = () => {
    if (user) {
      getUser(user.uid).then((userObj) => {
        if (!userObj) {
          createUserProfile(payload).then((object) => {
            setUserProfile(object);
            router.push('/user/createUser');
          });
        }
      });
    }
  };
  const handleClick = () => {
    if (!user) {
      signIn();
      router.push('/');
    } else signOut();
  };
  useEffect(() => {
    validateUser();
  }, [user]);
  return (
    <>
      <Navbar>
        <Nav.Link onClick={router.back}>
          <IoIosArrowBack />
          Methods
        </Nav.Link>
        <Container>
          <Navbar.Brand>
            <Image
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1>Please login in to access more!</h1>
        <Button type="button" size="lg" className="copy-btn" onClick={handleClick}>
          {!user ? 'Sign In' : 'Sign Out'}
        </Button>
      </div>
    </>
  );
}

export default Settings;
