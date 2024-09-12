import bcrypt from "bcrypt";
import databaseConnection from "../../dbCredentials/db.connection.js";
import generateTokenAndSetCookie from "../../utils/generateToken.js";

const signIn = async (req, res) => {
  try {
    let { username, password } = req.body;

    let [userData] = await databaseConnection.query(
      "select userId,password from users where userName = ?",
      [username]
    );

    if (userData.length <= 0) {
      return res
        .status(400)
        .json({ message: "username or password is incorrect" });
    }
    let { userId, password: hashedPassword } = userData[0];

    let isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "username or password is incorrect" });
    }
    generateTokenAndSetCookie(userId,res);

    res.status(200).json({ message: "logged in", userId, username });
  } catch (err) {
    return res.status(500).json({message: "Internal server error"});
  }
};

export default signIn;
