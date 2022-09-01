import React from 'react';
import {
  Button,
} from 'react-bootstrap';
import { signIn, signOut } from '../../utils/auth';
import { useAuth } from '../../utils/context/authContext';

export default function AuthenticationButton() {
  const { user } = useAuth();
  const handleClick = () => {
    if (!user) {
      signIn();
    } else signOut();
  };
  return (
    <>
      <Button variant={!user ? 'primary' : 'danger'} type="button" size="lg" className="copy-btn" onClick={handleClick}>
        {!user ? 'Sign In' : 'Sign Out'}
      </Button>
    </>
  );
}
