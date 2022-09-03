import axios from 'axios';
import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getGrinds = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/grind.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});
const getSingleGrind = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/grind/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});
export { getGrinds, getSingleGrind };
