/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
// import PropTypes from 'prop-types';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import { BiBookReader } from 'react-icons/bi';
import { MdOutlineCoffeeMaker } from 'react-icons/md';
import { GrFavorite, GrLogin } from 'react-icons/gr';
import { useAuth } from '../utils/context/authContext';
import SettingsModal from './modal/SettingsModal';

export default function MainNavBar() {
  const { user } = useAuth();

  return (
    <Navbar fixed="bottom" collapseOnSelect expand="true" bg="transparent" variant="dark">
      {
        user
          ? (
            <Container>
              <Nav.Link href="/">
                <BiBookReader />
              </Nav.Link>
              <Nav.Link href="/">
                <MdOutlineCoffeeMaker />
              </Nav.Link>
              <Nav.Link href="/">
                <GrFavorite />
              </Nav.Link>
              <Nav.Link>
                <SettingsModal />
              </Nav.Link>
            </Container>
          )
          : (
            <Container>
              <Nav.Link href="/">
                <MdOutlineCoffeeMaker />
              </Nav.Link>
              <Nav.Link href="/settings">
                Login
                <GrLogin />
              </Nav.Link>
            </Container>
          )
      }
    </Navbar>
  );
}
// MainNavBar.propTypes = {
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
// MainNavBar.defaultProps = {
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
