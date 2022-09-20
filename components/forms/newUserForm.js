import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getMethods } from '../../utils/data/apiData/methods';
import { updateUser } from '../../utils/data/apiData/userData';

const initialSate = {
  favRoast: '',
  description: '',
  brewMethod: '',
  favShop: '',
};

function NewUserForm({ obj }) {
  const { user } = useAuth();
  const router = useRouter();
  const [formInput, setFormInput] = useState(initialSate);
  const [methods, setMethods] = useState([]);

  useEffect(() => {
    getMethods().then(setMethods);
    if (obj.favRoast) setFormInput(obj);
  }, [obj, user]);
  const handleClick = () => {
    router.push('/settings');
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
    };
    updateUser(obj.uid, payload).then(() => router.push('/settings'));
  };

  return (
    <>
      <div className="profile-card">
        <div className="profile-card-header">
          <Image className="profile-picture-lg" layout="responsive" src={obj?.photoUrl} />
          <h1>{obj.name}</h1>
        </div>
        <div>
          <Form onSubmit={handleSubmit}>
            <p>
              Favorite Coffee Shop:
              <Form.Control bsPrefix="form-box" type="text" placeholder="Click Me" name="favShop" value={formInput.favShop} onChange={handleChange} required />
            </p>
            <p>
              Favorite Roast:
              <Form.Select
                aria-label="Favorite Roast"
                size="sm"
                name="favRoast"
                onChange={handleChange}
                value={formInput.favRoast}
                bsPrefix="form-box"
                required
              >
                <option value="">Click Me</option>
                <option value="Light">Light</option>
                <option value="Medium">Medium</option>
                <option value="Dark">Dark</option>
              </Form.Select>
            </p>
            <p>About:
              <Form.Control bsPrefix="form-box" type="text" placeholder="Click me" name="description" value={formInput.description} onChange={handleChange} required />
            </p>
            <p>
              Favorite Method:
              <Form.Select
                aria-label="Favorite Method"
                name="brewMethod"
                onChange={handleChange}
                value={formInput.brewMethod}
                bsPrefix="form-box"
                required
              >
                <option className="form-drop" value="">Choose your favorite method</option>
                {
                methods.map((method) => (
                  <option
                    className="form-drop"
                    key={method.firebaseKey}
                    value={method.firebaseKey}
                  >
                    {method.name}
                  </option>
                ))
              }
              </Form.Select>
            </p>
          </Form>
        </div>
      </div>
      <div className="process-cta-container">
        <button type="button" className="btn-med" variant="secondary" onClick={handleClick}>Maybe Later</button>
        <button type="submit" onClick={handleSubmit} className="btn-med" variant="success">Submit</button>
      </div>
    </>
  );
}

export default NewUserForm;

NewUserForm.propTypes = {
  obj: PropTypes.shape({
    uid: PropTypes.string,
    brewMethod: PropTypes.string,
    favRoast: PropTypes.string,
    favShop: PropTypes.string,
    coffeeRankId: PropTypes.string,
    desciption: PropTypes.string,
    photoUrl: PropTypes.string,
    name: PropTypes.string,
  }),
};
NewUserForm.defaultProps = {
  obj: PropTypes.shape({
    uid: '',
    brewMethod: '',
    favRoast: '',
    favShop: '',
    coffeeRankId: '',
    desciption: '',
    photoUrl: '',
    name: '',
  }),
};
