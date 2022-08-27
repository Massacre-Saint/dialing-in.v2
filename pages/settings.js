import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn, signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function Signin() {
  const { user } = useAuth();
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
      <h1>Hi there!</h1>
      {
        !user
          ? (
            <Button type="button" size="lg" className="copy-btn" onClick={signIn}>
              Sign In
            </Button>
          )
          : (
            <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
              Sign Out
            </Button>
          )
      }

    </div>
  );
}

export default Signin;
