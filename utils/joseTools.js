import * as jose from "jose";
const JWT_KEY = process.env.SECRET;

export async function sign(payload) {
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "ES256" })
    .setIssuedAt()
    // .setIssuer("urn:example:issuer")
    // .setAudience("urn:example:audience")
    .setExpirationTime("2h")
    .sign(JWT_KEY);

  console.log("Jose", jwt);
  return jwt;
}

export async function verify(token, JWT_KEY) {
  const { payload } = await jose.jwtVerify(
    token,
    new TextEncoder().encode(JWT_KEY)
  );
  // run some checks on the returned payload, perhaps you expect some specific values

  // if its all good, return it, or perhaps just return a boolean
  return payload;
}
