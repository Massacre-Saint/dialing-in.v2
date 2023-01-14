/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Navbar, Nav, Image,
} from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import ProfileCard from '../components/read/ProfileCard';
import AuthenticationButton from '../components/buttons/AuthenticationButton';
import { checkUser, registerUser } from '../utils/auth';

function Settings() {
  const router = useRouter();
  const { user } = useAuth();
  const payload = {
    uid: user.uid,
    imageUrl: user.photoURL,
    name: user.displayName,
  };
  const validateUser = () => {
    if (user) {
      checkUser(user.uid).then((userObj) => {
        if (!userObj) {
          registerUser(payload).then(() => {
            router.push('/read/user/createUser');
          });
        }
      });
      // getUser(user.uid).then((userObj) => {
      //   if (!userObj) {
      //     createUserProfile(payload).then(() => {
      //       router.push('/read/user/createUser');
      //     });
      //   }
      // });
    }
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
            <Navbar className="navbar">
              <Nav.Link onClick={handleBack}>
                <button type="button" className="btn-sm">&#8249; Methods</button>
              </Nav.Link>
              <div className="page-title">Settings</div>
            </Navbar>
            <div className="settings-container">
              <div>
                <Image className="logo" src="/images/Dialing-Logo.svg" />
              </div>
              <div className="signIn-content">
                <h1>Let&apos;s sign you in</h1>
              </div>
              <div className="signIn-content">
                <p>Bring together your community, recipes, and knowledge about coffee into one app!</p>
              </div>
            </div>
            <div className="bottom-cta">
              <AuthenticationButton />
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
