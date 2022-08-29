/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { signIn, signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { createUserProfile, getUser } from '../utils/data/apiData/userData';

function Settings() {
  const { user } = useAuth();
  const payload = {
    uid: user.uid,
    photoUrl: user.photoURL,
    name: user.displayName,
  };
  const validateUser = () => {
    if (user.uid) {
      getUser(user.uid).then((userObj) => {
        if (!Object.values(userObj).length) {
          console.warn(' no user');
          createUserProfile(payload);
        }
      });
    }
  };
  const handleClick = () => {
    if (!user) {
      signIn();
    } signOut();
  };
  useEffect(() => {
    validateUser();
  }, [user]);
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Button type="button" size="lg" className="copy-btn" onClick={handleClick}>
        {!user ? 'Create Account' : 'Sign Out'}
      </Button>
    </div>
  );
}

export default Settings;
