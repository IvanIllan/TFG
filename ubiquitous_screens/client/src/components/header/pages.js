import routes from '../../routes';

export default {
  public: [
    { id: 'signup', title: 'Sign up', path: routes.signup },
    { id: 'signin', title: 'Sign in', path: routes.signin }
  ],
  private: [
    { id: 'screenManager', title: 'Screen Manager', path: routes.manageScreens},
    { id: 'itemManager', title: 'Item Manager', path: routes.manageItems }
  ]
};