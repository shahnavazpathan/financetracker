import databaseConnection from "../../../dbCredentials/db.connection.js";

const deleteIncome = async (req, res) => {
  try {
    const { userId } = req;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized User" });
    }
    let dataId = req.params.dataId;
    if (!dataId) {
      return res
        .status(400)
        .json({ message: "Please provide dataId in parameter!" });
    }
    dataId = Number(dataId);
    

    const result = await databaseConnection.query(
      "delete from data where userId = ? and dataId = ?",
      [userId, dataId]
    );  
    if(result[0].affectedRows <= 0) {
      return res
        .status(400)
        .json({ message: "There is no income with this dataId!" });
    }
    
    return res
      .status(200)
      .json({ message: "Income has been deleted successfully!" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export default deleteIncome;
