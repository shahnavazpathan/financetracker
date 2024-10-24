import databaseConnection from "../../../dbCredentials/db.connection.js";

const addIncome = async (req, res) => {
  try {
    const { userId } = req;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized User" });
    }
    let { income, category, description, account } = req.body;
    if (!income) {
      return res
        .status(400)
        .json({ message: "Income value is complusory, others are optional!" });
    }

    if (typeof income != "number") {
      return res
        .status(400)
        .json({ message: "Income value should be number!" });
    }
    account = account || "cash";

    const addIncomeQuery = await databaseConnection.query(
      "insert into data(userId,income,expense,category,description,account,date) values(?,?,0,?,?,?,now())",
      [userId, income, category, description, account]
    );

    return res
      .status(200)
      .json({ message: "Income has been inserted successfully!" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error!" });
  }
};

export default addIncome;
