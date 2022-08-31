import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
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
  useEffect(() => {
    getMethods().then(setMethods);
    if (obj.uid) setFormInput(obj);
  }, [obj, user]);
  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingInput1" label="Short Introduction" className="mb-3">
            <Form.Control type="text" placeholder="Tell us about you" name="description" value={formInput.description} onChange={handleChange} required />
          </FloatingLabel>
          <FloatingLabel controlId="floatingSelect1" label="Favorite Roast">
            <Form.Select
              aria-label="Favorite Roast"
              name="favRoast"
              onChange={handleChange}
              value={formInput.favRoast}
              required
            >
              <option value="Light">Light</option>
              <option value="Medium">Medium</option>
              <option value="Dark">Dark</option>
            </Form.Select>
          </FloatingLabel>
          <br />
          <FloatingLabel controlId="floatingInput2" label="Favorite Coffee Shop" className="mb-3">
            <Form.Control type="text" placeholder="Favorite Coffee Shop" name="favShop" value={formInput.favShop} onChange={handleChange} required />
          </FloatingLabel>
          <FloatingLabel controlId="floatingSelect2" label="Favorite Method">
            <Form.Select
              aria-label="Favorite Method"
              name="brewMethod"
              onChange={handleChange}
              value={formInput.brewMethod}
              required
            >
              <option value="">Choose your favorite method</option>
              {
                methods.map((method) => (
                  <option
                    key={method.fbKey}
                    value={method.fbKey}
                  >
                    {method.name}
                  </option>
                ))
              }
            </Form.Select>
          </FloatingLabel>
          <br />
          <Button type="submit" variant="success">Submit</Button>
        </Form>
      </div>
      <div>
        <Button variant="secondary">Maybe Later</Button>
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
