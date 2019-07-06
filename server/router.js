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
    entries() {
      return { routesWithMethodGet, routesWithMethodPost };
    }
  };

  return routes;
};

module.exports = router;