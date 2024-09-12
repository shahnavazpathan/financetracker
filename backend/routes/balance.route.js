import databaseConnection from "../dbCredentials/db.connection.js";

const balanceRoute = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "Please first sign in!" });
    }
    let [balance] = await databaseConnection.query(
      "select sum(income) - sum(expense) as balance from data where userId = ?",
      [userId]
    );

    balance = balance[0].balance;
    return res.status(200).json({ message: balance });
  } catch (error) {
    console.log("Error in balance route", error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export default balanceRoute;
