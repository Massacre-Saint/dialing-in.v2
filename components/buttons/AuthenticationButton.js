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
      <button variant={!user ? 'primary' : 'danger'} type="button" size="lg" className="btn-span-lg" onClick={handleClick}>
        {!user ? 'Sign In' : 'Sign Out'}
      </button>
    </>
  );
}
