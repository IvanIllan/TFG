import routes from '../../routes';

export default {
  public: [
    { id: 'signup', title: 'Sign up', path: routes.signup },
    { id: 'signin', title: 'Sign in', path: routes.signin }
  ],
  private: [
    { id: 'screens', title: 'Configurador', path: routes.screens },
    { id: 'items', title: 'Creador de Objetos', path: routes.items } 
  ]
};