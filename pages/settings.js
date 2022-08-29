import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn, signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function Settings() {
  const { user } = useAuth();
  const validateUser = () => {
    if (user.uid) {
      console.warn('yes');
    } console.warn('no');
  };
  const handleClick = () => {
    if (!user) {
      signIn(() => validateUser());
    } signOut(() => validateUser());
  };
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
