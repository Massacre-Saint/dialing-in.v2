import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getMethods } from '../../utils/data/apiData/methods';
import { updateUser } from '../../utils/data/apiData/userData';

const initialSate = {
  favRoast: '',
  description: '',
  methodId: '',
  favShop: '',
};

export default function NewUserForm({ obj, user }) {
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
    console.warn(payload, formInput);
    updateUser(obj.id, payload).then(() => router.push('/settings'));
  };

  return (
    <>
      <div className="profile-card">
        <div className="profile-card-header">
          <Image className="profile-picture-lg" layout="responsive" src={user.photoURL} />
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
                name="methodId"
                onChange={handleChange}
                value={formInput.methodId.id}
                bsPrefix="form-box"
                required
              >
                <option className="form-drop" value="">Choose your favorite method</option>
                {
                methods.map((method) => (
                  <option
                    className="form-drop"
                    key={method.id}
                    value={method.id}
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
        <button type="button" className="btn-med" onClick={handleClick}>Later</button>
        <button type="submit" onClick={handleSubmit} className="btn-lg">Submit</button>
      </div>
    </>
  );
}

NewUserForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    method_id: PropTypes.shape({
      id: PropTypes.number,
      grind_size: PropTypes.string,
      image_url: PropTypes.string,
    }),
    favRoast: PropTypes.string,
    favShop: PropTypes.string,
    desciption: PropTypes.string,
    image_url: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    photoURL: PropTypes.string,
  }).isRequired,
};
