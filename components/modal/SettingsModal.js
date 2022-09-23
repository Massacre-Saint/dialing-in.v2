/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
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
        className="settings-modal"
        placement="bottom"
        style={{
          height: '15vh',
        }}
      >
        <Offcanvas.Header closeButton style={{ position: 'absolute', right: '5px' }} />
        <Offcanvas.Body>
          <>
            <div className="process-cta-container">
              <button type="button" className="btn-lg" onClick={handleRoute} variant="link">Profile
              </button>
              <AuthenticationButton />
            </div>
          </>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
