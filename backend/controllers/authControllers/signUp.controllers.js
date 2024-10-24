import bcrypt from "bcrypt";
import databaseConnection from "../../dbCredentials/db.connection.js";
import generateTokenAndSetCookie from "../../utils/generateToken.js";
import sendMail from "../../utils/sendMail.js";

const signUp = async (req, res) => {
  try {
    let { username, password, confirmPassword, email } = req.body;

    if (!username || !password || !email || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (
      username.includes(" ") ||
      password.includes(" ") ||
      email.includes(" ") ||
      confirmPassword.includes(" ")
    ) {
      return res.status(400).json({ message: "Space not allowed" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password did not match!" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be 8 characters long!" });
    }

    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]+$/.test(
        password
      )
    ) {
      return res
        .status(400)
        .json({
          message:
            "Invalid password: Must be alphanumeric and contain at least one special character!",
        });
    }

    username = username.trim();
    email = email.trim();

    const [existCheck] = await databaseConnection.query(
      `select userName from users where userName = ?`,
      [username]
    );

    if (existCheck.length > 0) {
      return res.status(400).json({ message: "user already exists!" });
    }

    let hashedPassword = await bcrypt.hash(password, 7);
    let hashedEmail = await bcrypt.hash(email, 7);

    const [insertQuery] = await databaseConnection.query(
      "INSERT INTO users (userName,password,email,isVerified) values (?, ?, ?,false)",
      [username, hashedPassword, hashedEmail]
    );
    let userId = insertQuery.insertId;

    if (userId == undefined) {
      return res.status(500).json({ message: "internal server error" });
    }

    await generateTokenAndSetCookie(userId, res);

    const isSent = await sendMail(req.get("host"), email, userId);

    if (isSent === false) {
      return res
        .status(500)
        .json({ message: "please enter valid email address!" });
    }

    return res.status(200).json({ message: "Please verify your email!" });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export default signUp;
