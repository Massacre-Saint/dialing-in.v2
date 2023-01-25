import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getGrinds = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/grinds`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});
const getSingleGrind = (grindId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/grinds/${grindId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});
export { getGrinds, getSingleGrind };
