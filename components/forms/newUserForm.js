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
};

function NewUserForm({ obj }) {
  const { user } = useAuth();
  const router = useRouter();
  const [formInput, setFormInput] = useState(initialSate);
  const [, setMethods] = useState([]);

  useEffect(() => {
    getMethods().then(setMethods);
  }, [obj, user]);

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
    updateUser(obj.uid, payload).then(() => router.push('/'));
  };

  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingInput1" label="Desciption" className="mb-3">
            <Form.Control as="textarea" placeholder="Tell us about you" name="description" value={formInput.description} onChange={handleChange} required />
          </FloatingLabel>
          <FloatingLabel controlId="floatingSelect" label="Favorite Roast">
            <Form.Select
              aria-label="Floating label select example"
              name="favRoast"
              onChange={handleChange}
              required
            >
              <option>Choose favorite roast</option>
              <option value="light">Light</option>
              <option value="medium">Medium</option>
              <option value="dark">Dark</option>
            </Form.Select>
          </FloatingLabel>
          <br />
          <Button type="submit" variant="success">Submit</Button>
        </Form>
      </div>
      <div>
        <Button variant="secondary">Maybe Later</Button>
        {/* <Button type="submit" variant="success">Submit</Button> */}
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
