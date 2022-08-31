/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import {
  Button,
} from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { GrUserSettings } from 'react-icons/gr';
import { useRouter } from 'next/router';
import { signIn, signOut } from '../../utils/auth';
import { useAuth } from '../../utils/context/authContext';

export default function SettingsModal() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user } = useAuth();

  const handleClick = () => {
    if (!user) {
      signIn();
    } else signOut();
  };
  const handleRoute = () => {
    router.push('/settings');
  };
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
              <Button onClick={handleRoute} variant="link">Profile
              </Button>
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
// SettingsModal.propTypes = {
//   validateUser: PropTypes.func,
//   obj: PropTypes.shape({
//     uid: PropTypes.string,
//     brewMethod: PropTypes.string,
//     favRoast: PropTypes.string,
//     favShop: PropTypes.string,
//     coffeeRankId: PropTypes.string,
//     desciption: PropTypes.string,
//     photoUrl: PropTypes.string,
//     name: PropTypes.string,
//   }),
// };
// SettingsModal.defaultProps = {
//   validateUser: () => {},
//   obj: PropTypes.shape({
//     uid: '',
//     brewMethod: '',
//     favRoast: '',
//     favShop: '',
//     coffeeRankId: '',
//     desciption: '',
//     photoUrl: '',
//     name: '',
//   }),
// };
