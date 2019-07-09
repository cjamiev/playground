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

module.exports = router;