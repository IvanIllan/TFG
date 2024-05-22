import routes from '../../routes';

export default {
  public: [
    { id: 'signup', title: 'Sign up', path: routes.signup },
    { id: 'signin', title: 'Sign in', path: routes.signin }
  ],
  private: [
    { id: 'items', title: 'Creador de Objetos', path: routes.items },
    { id: 'createScreen', title: 'Crear Pantalla', path: routes.createScreen },
    { id: 'updateScreen', title: 'Actualizar/Eliminar Pantalla', path: routes.updateScreen }
  ]
};