import axios from 'axios';
import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getUser = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/user/${uid}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateUser = (uid, payload) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/user/${uid}.json`, payload)
    .then(() => getUser(uid).then(resolve))
    .catch(reject);
});

const createUserProfile = (userObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/user/${userObj.uid}.json`, userObj)
    .then(() => {
      getUser(userObj.uid).then(resolve);
    }).catch(reject);
});

export { getUser, createUserProfile, updateUser };
