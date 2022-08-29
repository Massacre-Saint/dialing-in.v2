import axios from 'axios';
import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getSingleUserProfile = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/userProfile/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createUserProfile = (userObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/userProfile.json`, userObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/userProfile/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

export { getSingleUserProfile, createUserProfile };
