import PropTypes from 'prop-types';
import {
  getSessionCookies,
  setSessionCookies,
  removeSessionCookies,
  USER,
  TOKEN
} from '../../utils';
import routes from '../../routes';

export const User = ({ history }) => {
  const signIn = (userData) => {
    setSessionCookies(userData);
    history.go(routes.plantcares);
  };

  const signOut = () => {
    removeSessionCookies();
    history.go(routes.root);
  };

  const isLoggedIn = () => {
    const session = getSessionCookies();

    return (
      session &&
      JSON.stringify(session) !== JSON.stringify({}) &&
      JSON.stringify(Object.keys(session)) === JSON.stringify([USER, TOKEN])
    );
  };

  const profile = () => getSessionCookies();

  return { signIn, signOut, isLoggedIn, profile };
};

export default User;

User.propTypes = {
  history: PropTypes.func.isRequired,
  sessionHandler: PropTypes.func.isRequired
};