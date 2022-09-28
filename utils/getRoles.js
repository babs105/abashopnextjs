import jwt from "jsonwebtoken";

const JWT_KEY = process.env.SECRET;

export const isAdmin = (token) => {
  const roles = jwt.verify(token, JWT_KEY).roles;
  return roles.includes("ROLE_ADMIN") ? true : false;
};
export const isUser = (token) => {
  const roles = jwt.verify(token, JWT_KEY).roles;
  return roles.includes("ROLE_USER") ? true : false;
};
