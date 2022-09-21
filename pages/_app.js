/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { AuthProvider } from '../utils/context/authContext';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider> {/* gives children components access to user and auth methods */}
      <ViewDirectorBasedOnUserAuthStatus
        component={Component}
        pageProps={pageProps}
      />
    </AuthProvider>
  );
}

export default MyApp;
