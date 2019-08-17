const router = () => {
  const routesWithMethodGet = [];
  const routesWithMethodPost = [];
  const routes = {
    get(url, route) {
      const newRoute = (req, res) => {
        if (req.url === url) {
          route(req, res);
        }
      };

      routesWithMethodGet.push(newRoute);

      return this;
    },
    post(url, route) {
      const newRoute = (req, res) => {
        if (req.url === url) {
          route(req, res);
        }
      };
      routesWithMethodPost.push(newRoute);

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

module.exports = { router };