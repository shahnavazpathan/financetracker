import databaseConnection from "../../../dbCredentials/db.connection.js";

const getExpense = async (req, res) => {
  try {
    const { userId } = req;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized User" });
    }
    const [getExpenseQuery] = await databaseConnection.query(
      "select dataId,expense,category,description,account,date_format(date,'%d-%m-%y-%h-%i-%s') as date from data where userId = ? && expense != 0",
      [userId]
    );

    return res.status(200).json({ data: getExpenseQuery });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default getExpense;
