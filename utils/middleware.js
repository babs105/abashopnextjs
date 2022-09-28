import jwt from "jsonwebtoken";

const JWT_KEY = process.env.SECRET;

const isAdminRoute = (pathname) => {
  return pathname.startsWith("/api/admin");
};

const isUserRoute = (pathname) => {
  return pathname.startsWith("/api/users");
};
export const middleware = (handler) => {
  return async (req, res) => {
    try {
      if (typeof req.headers.authorization !== "string") {
        return res.redirect(307, "/notAuthorizate");
        // return;
      }
      console.log("req", req.url);
      const tokenBearer = req.headers.authorization;
      const token = tokenBearer?.split(" ")[1];
      const roles = jwt.verify(token, JWT_KEY).roles;
      // const { payload } = jwt?.decode(token);
      console.log("token", token);
      console.log("roles", roles);

      const pathname = req.url;
      if (isUserRoute(pathname) && !roles.includes("ROLE_USER")) {
        return res.redirect(307, "/notAuthorizate");
      }
      if (isAdminRoute(pathname) && !roles.includes("ROLE_ADMIN")) {
        return res.redirect(307, "/notAuthorizate");
      }
      return handler(req, res);
    } catch (error) {
      console.log("error in  middleware", error);
    }
  };
};
