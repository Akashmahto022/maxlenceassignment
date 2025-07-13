import jwt from "jsonwebtoken";

const generateAccessToken = (currentUser) => {
  const token = jwt.sign(
    { id: currentUser.id, email: currentUser.email },
    process.env.JWT_SECRET_KET,
    { expiresIn: "60m" }
  );
  return token;
};

const generateRefreshToken = (currentUser) => {
  const token = jwt.sign(
    { id: currentUser.id },
    process.env.JWT_SECRET_REFRESH_KEY,
    { expiresIn: "24h" }
  );
  return token;
};

const verifyUserToken = (token) => {
  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KET);
    return decodeToken;
  } catch (error) {
    return null;
  }
};

export { generateAccessToken, generateRefreshToken, verifyUserToken };
