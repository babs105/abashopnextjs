import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/user";
import { errorHandler, responseHandler } from "../../../utils/common";
// import * as jose from "jose";
// import jwt from "@tsndr/cloudflare-worker-jwt";

const JWT_KEY = process.env.SECRET;

export default async function handler(req, res) {
  try {
    await connectMongo();
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      errorHandler("Username ou password  incorrect", res);
    }
    // validate
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const payload = {
        id: user.id,
        username: user.username,
        roles: user.roles,
      };

      // create a jwt token that is valid for 1 day
      const token = jwt.sign(payload, JWT_KEY, {
        expiresIn: "1d",
      });
      //   const token = await new jose.SignJWT(payload)
      //     .setProtectedHeader({ alg: "ES256" })
      //     .setIssuedAt()
      //     .setExpirationTime("2h")
      //     .sign(JWT_KEY);
      //   const token = await jwt.sign(payload, JWT_KEY);
      console.log("Jose", token);

      // return basic user details and token
      responseHandler(
        {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          token: token,
          roles: user.roles,
          address: user.address,
          telephone: user.telephone,
        },
        res
      );
    }
  } catch (err) {
    errorHandler(err, res);
  }
}
