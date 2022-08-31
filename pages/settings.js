/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { IoIosArrowBack } from 'react-icons/io';
import {
  Button,
  Navbar, Container, Nav,
} from 'react-bootstrap';
import { signIn, signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { createUserProfile, getUser } from '../utils/data/apiData/userData';
import ProfileCard from '../components/read/ProfileCard';

function Settings() {
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
          createUserProfile(payload).then(() => {
            router.push('/user/createUser');
          });
        }
      });
    }
  };
  const handleClick = () => {
    if (!user) {
      signIn();
    } else signOut();
  };
  const handleBack = () => {
    router.push('/');
  };
  useEffect(() => {
    validateUser();
  }, [user]);
  return (
    <>
      {
      !user
        ? (
          <div>
            <Navbar>
              <Nav.Link onClick={handleBack}>
                <IoIosArrowBack />
                Methods
              </Nav.Link>
              <Container>
                Settings
              </Container>
            </Navbar>
            <div>
              <h1>Please Login</h1>
            </div>
            <div>
              <Button variant={!user ? 'primary' : 'danger'} type="button" size="lg" className="copy-btn" onClick={handleClick}>
                {!user ? 'Sign In' : 'Sign Out'}
              </Button>
            </div>
          </div>
        )
        : (
          <ProfileCard />
        )
    }
    </>
  );
}

export default Settings;
