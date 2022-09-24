import React from 'react';
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
      <button className="btn-lg" variant={!user ? 'primary' : 'danger'} type="button" onClick={handleClick}>
        {!user ? 'Sign In' : 'Sign Out'}
      </button>
    </>
  );
}
