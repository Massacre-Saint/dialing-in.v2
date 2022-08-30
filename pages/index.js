/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import Image from 'next/image';
import { getMethods } from '../utils/data/apiData/methods';
import Method from '../components/Method';
import MainNavbar from '../components/MainNavBar';
import { useAuth } from '../utils/context/authContext';
import { getUser } from '../utils/data/apiData/userData';

export default function Methods() {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState({});
  const [methods, setMethods] = useState([]);
  const getAllMethods = () => {
    getMethods().then(setMethods);
  };
  const validateUser = () => {
    if (user) {
      getUser(user.uid).then(setUserProfile);
    }
  };
  useEffect(() => {
    getAllMethods();
    validateUser();
  }, [user]);
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand>
            <Image
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Dialing In
          </Navbar.Brand>
          <Nav.Link href="/settings">
            <IoIosAddCircleOutline />
          </Nav.Link>
        </Container>
      </Navbar>
      <div>
        <div>
          {methods.map((i) => (
            <Method key={i.fbKey} methodObj={i} />
          ))}
        </div>
      </div>
      <MainNavbar validateUser={validateUser} obj={userProfile} />
    </>
  );
}
