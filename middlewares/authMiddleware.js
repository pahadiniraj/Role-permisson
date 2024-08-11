import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["authorization"];
    console.log("hello toki toki" + token);

    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Token is required for authentication",
      });
    }

    const bearer = token.split(" ");
    const bearerToken = bearer.length > 1 ? bearer[1] : bearer[0];

    // Log the token before verification
    console.log("Verifying Token:", bearerToken);

    const decodedData = jwt.verify(
      bearerToken,
      process.env.SECRET_ACCESS_TOKEN
    );

    console.log("Decoded Data:", decodedData); // Log the decoded data

    req.user = decodedData.user;
    next();
  } catch (error) {
    console.error("Token Verification Error:", error.message); // Log the error
    return res.status(400).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export { verifyToken };
