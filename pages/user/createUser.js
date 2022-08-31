/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosAddCircleOutline } from 'react-icons/io';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getUser } from '../../utils/data/apiData/userData';
import NewUserForm from '../../components/forms/newUserForm';

export default function CreateUser() {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    getUser(user.uid).then(setUserProfile);
  }, [user]);
  const router = useRouter();
  return (
    <>
      <Navbar>
        <Nav.Link onClick={router.back}>
          <IoIosArrowBack />
          Methods
        </Nav.Link>
        <Container>
          <Navbar.Brand>
            <Image
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            About you...
          </Navbar.Brand>
        </Container>
        <Nav.Link href="/">
          <IoIosAddCircleOutline />
        </Nav.Link>
      </Navbar>
      <div>
        <div>
          <h1>Tell us more</h1>
          <NewUserForm obj={userProfile} />
        </div>
      </div>
    </>
  );
}
