/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Navbar, Nav, Image,
} from 'react-bootstrap';
import { AiFillEdit } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { useAuth } from '../../utils/context/authContext';
import { getUser } from '../../utils/data/apiData/userData';
import AuthenticationButton from '../buttons/AuthenticationButton';
import { getSingleMethod } from '../../utils/data/apiData/methods';

export default function ProfileCard() {
  const [userProfile, setUserProfile] = useState({});
  const [method, setMethod] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const handleEdit = () => {
    router.push('/read/user/createUser');
  };
  const handleBack = () => {
    router.push('/');
  };
  useEffect(() => {
    getUser(user.uid).then((obj) => {
      setUserProfile(obj);
      getSingleMethod(obj.brewMethod).then(setMethod);
    });
  }, [user]);
  return (
    <>
      <Navbar className="navbar">
        <Nav.Link onClick={handleBack}>
          <button className="btn-sm" type="button">&#8249; Methods</button>
        </Nav.Link>
        <div className="page-title">
          <h4>Profile Page</h4>
        </div>
      </Navbar>
      <>
        <div>
          {userProfile?.description
            ? (
              <div className="profile-card">
                <div className="profile-card-header">
                  <Image className="profile-picture-lg" layout="responsive" src={userProfile?.photoUrl} />
                  <h1>{userProfile.name}</h1>
                </div>
                <div>
                  <p className="profile-title">Favorite Method:
                    <span className="profile-content">{method?.name}</span>
                  </p>
                  <p className="profile-title">About:
                    <span className="profile-content">{userProfile.description}</span>
                  </p>
                  <p className="profile-title">
                    Favorite Roast:
                    <span className="profile-content">{userProfile.favRoast}</span>
                  </p>
                  <p className="profile-title">
                    Favorite Coffee Shop:
                    <span className="profile-content">{userProfile.favShop}</span>
                  </p>
                </div>
                <div>
                  <button aria-label="edit" type="button" className="btn-stripped card-delete" onClick={handleEdit} variant="success">
                    <IconContext.Provider value={{ size: '2em' }}>
                      <AiFillEdit />
                    </IconContext.Provider>
                  </button>
                </div>
              </div>
            )
            : (
              <div className="profile-card blur">
                <div className="profile-card-header">
                  <Image className="profile-picture-lg" layout="responsive" src={userProfile?.photoUrl} />
                  <h1>{userProfile.name}</h1>
                </div>
                <div>
                  <p>Favorite Method: {userProfile.brewMethod}</p>
                  <p>About: </p>
                  <span>{userProfile.description}</span>
                  <p>Favorite Roast: {userProfile.favRoast}</p>
                  <p>Favorite Coffee Shop: {userProfile.favShop} </p>
                </div>
                <button aria-label="edit" type="button" className="btn-stripped card-delete-btn" onClick={handleEdit} variant="success"><AiFillEdit /></button>
              </div>
            )}
        </div>
      </>
      <div>
        <AuthenticationButton />
      </div>
    </>
  );
}
