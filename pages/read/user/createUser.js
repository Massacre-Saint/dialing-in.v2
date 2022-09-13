/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Navbar, Nav,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../../utils/context/authContext';
import { getUser } from '../../../utils/data/apiData/userData';
import NewUserForm from '../../../components/forms/newUserForm';

export default function CreateUser() {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    getUser(user.uid).then(setUserProfile);
  }, [user]);
  const router = useRouter();
  return (
    <>
      <Navbar className="navbar">
        <Nav.Link onClick={router.back}>
          <button className="btn-sm" type="button">&#8249; Back</button>
        </Nav.Link>
        <div className="page-title">About you</div>
      </Navbar>
      <div>
        <div>
          <NewUserForm obj={userProfile} />
        </div>
      </div>
    </>
  );
}
