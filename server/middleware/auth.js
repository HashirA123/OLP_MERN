import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const auth = (token) => {
  dotenv.config();
  try {
    const isCustomAuth = token.length < 500;

    let decodedData;
    let userId;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET); // Make sure to make the secret value more secure.
      // also need to change the secret in the frontend
      userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      userId = decodedData?.sub;
    }

    return userId;
  } catch (error) {
    console.log(error);
    return "error";
  }
};

export default auth;
