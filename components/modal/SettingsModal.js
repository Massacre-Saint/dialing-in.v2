/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import {
  Button,
} from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FiSettings } from 'react-icons/fi';
import { useRouter } from 'next/router';
import AuthenticationButton from '../buttons/AuthenticationButton';

export default function SettingsModal() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRoute = () => {
    router.push('/settings');
  };
  return (
    <>
      <button type="button" variant="link" onClick={handleShow} className="btn-stripped nav-item">
        <FiSettings />
      </button>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{
          width: '50vw',
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <>
            <div>
              <Button onClick={handleRoute} variant="link">Profile
              </Button>
            </div>
            <div>
              <AuthenticationButton />
            </div>
          </>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
