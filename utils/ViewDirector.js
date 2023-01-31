import PropTypes from 'prop-types';
import { useAuth } from './context/authContext';
import { Loading } from '../components/index';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { userLoading } = useAuth();

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // what the user should see if they are logged in
  return (
    <>
      <div>
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
