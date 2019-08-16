const flatten = (arr = []) => arr.reduce((accumulator, item) => accumulator.concat(item), []);

const router = () => {
  const routesWithMethodGet = [];
  const routesWithMethodPost = [];
  const routes = {
    get(route) {
      routesWithMethodGet.push(route);

      return this;
    },
    post(route) {
      routesWithMethodPost.push(route);

      return this;
    },
    loadGetRoutes() {
      return routesWithMethodGet;
    },
    loadPostRoutes() {
      return routesWithMethodPost;
    }
  };

  return routes;
};

const loadRoutes = (routes) => {
  const routesWithMethodGet = flatten(routes.map(route => route.loadGetRoutes()));
  const routesWithMethodPost = flatten(routes.map(route => route.loadPostRoutes()));

  return { routesWithMethodGet, routesWithMethodPost };
};

module.exports = { loadRoutes, router };