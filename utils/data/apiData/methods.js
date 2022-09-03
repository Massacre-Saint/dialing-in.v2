import axios from 'axios';
import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getMethods = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/methods.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getSingleMethod = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/methods/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export { getMethods, getSingleMethod };
