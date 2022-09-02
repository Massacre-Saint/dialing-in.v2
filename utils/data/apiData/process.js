import axios from 'axios';
import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const createProcess = (processObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/process.json`, processObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/process/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});
const getProcess = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/process/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});
const deleteProcess = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/process/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});
export { createProcess, getProcess, deleteProcess };
