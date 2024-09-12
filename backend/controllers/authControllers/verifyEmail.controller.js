import databaseConnection from "../../dbCredentials/db.connection.js";
import jwt from "jsonwebtoken";

const verifyEmail = async (req, res) => {
  try {
    const { otp } = req.query;

    if (!otp) {
      return res.status(401).json({ message: "No otp found in the link" });
    }

    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [dbOtp] = await databaseConnection.query(
      "select otp from otp_table where userId = ?",
      [decoded.userId]
    );

    if (otp != dbOtp[0].otp) {
      return res.status(401).json({ message: "Unauthorized User" });
    }

    await databaseConnection.query(
      "update users set isVerified = true where userId = ?",
      [decoded.userId]
    );
          
    res.send({ message: "Email verfied successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized User" });
  }
};

export default verifyEmail;
