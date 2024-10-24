import databaseConnection from "../../../dbCredentials/db.connection.js";

const getIncome = async (req, res) => {
  try {
    const { userId } = req;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized User" });
    }

    const [getIncomeQuery] = await databaseConnection.query(
      "select dataId,income,category,description,account,date from data where userId = ? && income != 0",
      [userId]
    );

    return res.status(200).json({ data: getIncomeQuery });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default getIncome;
