import axios from 'axios';
import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getUser = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/user.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateUser = (userObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/user/${userObj.firebaseKey}.json`, userObj)
    .then(() => getUser(userObj.uid).then(resolve))
    .catch(reject);
});

const createUserProfile = (userObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/user.json`, userObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/user/${response.data.name}.json`, payload)
        .then(() => {
          getUser(userObj.uid).then(resolve);
        });
    }).catch(reject);
});

export { getUser, createUserProfile, updateUser };
