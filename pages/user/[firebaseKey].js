import React from 'react';
import { IoIosArrowBack, IoIosAddCircleOutline } from 'react-icons/io';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function UserPage() {
  const router = useRouter();

  return (
    <>
      <Navbar>
        <Nav.Link onClick={router.back}>
          <IoIosArrowBack />
          Settings
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
            hello user
          </Navbar.Brand>
        </Container>
        <Nav.Link href="/">
          <IoIosAddCircleOutline />
        </Nav.Link>
      </Navbar>
      <div>
        <h1>make user page</h1>
      </div>
    </>
  );
}
