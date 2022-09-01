/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IoIosArrowBack } from 'react-icons/io';
import {
  Button,
  Navbar, Container, Nav, Image,
} from 'react-bootstrap';
import { signIn, signOut } from '../../utils/auth';
import { useAuth } from '../../utils/context/authContext';
import { getUser } from '../../utils/data/apiData/userData';

export default function ProfileCard() {
  const [userProfile, setUserProfile] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const handleClick = () => {
    if (!user) {
      signIn();
    } else signOut();
    router.push('/');
  };
  const handleEdit = () => {
    router.push('/read/user/createUser');
  };
  const handleBack = () => {
    router.push('/');
  };
  useEffect(() => {
    getUser(user.uid).then(setUserProfile);
  }, [user.photoURL]);
  return (
    <>
      <Navbar>
        <Nav.Link onClick={handleBack}>
          <IoIosArrowBack />
          Methods
        </Nav.Link>
        <Container>
          <h4>Profile Page</h4>
        </Container>
      </Navbar>
      <>
        <div>
          <div>
            {userProfile?.description
              ? (
                <>
                  <div>
                    <Image width="150px" rounded src={userProfile.photoUrl} />
                  </div>
                  <div>
                    <h3>Favorite Method: {userProfile.brewMethod}</h3>
                    <h3>About: </h3>
                    <div>
                      <h4>{userProfile.description}</h4>
                    </div>
                    <h3>Favorite Roast: {userProfile.favRoast}</h3>
                    <h3>Favorite Coffee Shop: {userProfile.favShop} </h3>
                  </div>
                  <div>
                    <br />
                    <h3>Edit you preferences?</h3>
                    <Button onClick={handleEdit} variant="success">Edit Profile</Button>
                  </div>
                </>
              )
              : (
                <div>
                  <h2>Seems empty in here</h2>
                  <p>Add your coffee preferences</p>
                  <Button onClick={handleEdit} variant="success">Edit Profile</Button>
                </div>
              )}
          </div>
        </div>
      </>
      <div>
        <Button variant={!user ? 'primary' : 'danger'} type="button" size="lg" className="copy-btn" onClick={handleClick}>
          {!user ? 'Sign In' : 'Sign Out'}
        </Button>
      </div>
    </>
  );
}
