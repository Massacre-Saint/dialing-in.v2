/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Button,
} from 'react-bootstrap';
import Link from 'next/link';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { GrUserSettings } from 'react-icons/gr';
import PropTypes from 'prop-types';
import { signIn, signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function SettingsModal({ obj, validateUser }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user } = useAuth();

  const handleClick = () => {
    if (!user) {
      signIn();
    } else signOut();
  };
  useEffect(() => {
    validateUser();
  }, [user]);
  return (
    <>
      <Button variant="link" onClick={handleShow}>
        <GrUserSettings />
      </Button>
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
              <Link passHref href={`/user/${obj.uid}`}>
                <h2>Profile Page</h2>
              </Link>
            </div>
            <div>
              <Button type="button" size="lg" className="copy-btn" onClick={handleClick}>
                {!user ? 'Sign In' : 'Sign Out'}
              </Button>
            </div>
          </>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
SettingsModal.propTypes = {
  validateUser: PropTypes.func,
  obj: PropTypes.shape({
    uid: PropTypes.string,
    brewMethod: PropTypes.string,
    favRoast: PropTypes.string,
    favShop: PropTypes.string,
    coffeeRankId: PropTypes.string,
    desciption: PropTypes.string,
    photoUrl: PropTypes.string,
    name: PropTypes.string,
  }),
};
SettingsModal.defaultProps = {
  validateUser: () => {},
  obj: PropTypes.shape({
    uid: '',
    brewMethod: '',
    favRoast: '',
    favShop: '',
    coffeeRankId: '',
    desciption: '',
    photoUrl: '',
    name: '',
  }),
};
