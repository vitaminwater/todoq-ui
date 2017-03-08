// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/ActivityList/reducer'),
          import('containers/ActivityList/sagas'),
          import('containers/ActivityList'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('ActivityList', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      childRoutes: [{
        path: '/log/:activity',
        name: 'activityLog',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
              import('containers/ActivityLog/reducer'),
              import('containers/ActivityLog/sagas'),
              import('containers/ActivityLog'),
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([reducer, sagas, component]) => {
            injectReducer('activityLog', reducer.default);
            injectSagas(sagas.default);
            renderRoute(component);
          });

          importModules.catch(errorLoading);
        },
      }]
    }, {
      path: '/settings',
      name: 'settings',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Settings/reducer'),
          import('containers/Settings/sagas'),
          import('containers/Settings'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('settings', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
