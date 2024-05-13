import jwt from "jsonwebtoken";

const auth = (token) => {
  try {
    const isCustomAuth = token.length < 500;

    let decodedData;
    let userId;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test"); // Make sure to make the secret value more secure.
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
