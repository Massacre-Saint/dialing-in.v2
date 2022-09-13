/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Navbar, Nav,
} from 'react-bootstrap';
import { IconContext } from 'react-icons/lib';
import { GiCoffeeBeans } from 'react-icons/gi';
import { useAuth } from '../utils/context/authContext';
import { createUserProfile, getUser } from '../utils/data/apiData/userData';
import ProfileCard from '../components/read/ProfileCard';
import AuthenticationButton from '../components/buttons/AuthenticationButton';

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
            router.push('/read/user/createUser');
          });
        }
      });
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
                <button type="button" className="back-nav">&#8249; Methods</button>
              </Nav.Link>
              Settings
            </Navbar>
            <div className="settings-container">
              <div>
                <IconContext.Provider value={{ size: '15em', color: '#251605' }}>
                  <div>
                    <GiCoffeeBeans />
                  </div>
                </IconContext.Provider>
              </div>
              <div>
                <h1>Let&apos;s sign you in</h1>
              </div>
              <div>
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
