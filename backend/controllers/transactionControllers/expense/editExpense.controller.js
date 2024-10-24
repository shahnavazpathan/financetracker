import databaseConnection from "../../../dbCredentials/db.connection.js";

const editExpense = async (req, res) => {
  try {
    let allowedFields = ['expense', 'description', 'category', 'account'];

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
    dataId = parseInt(dataId);
    if (Object.values(req.body).length > 4) {
      return res
        .status(400)
        .json({ message: "You cannot provide more than 4 info!" });
    }
    if (!Object.keys(req.body).every((key) => allowedFields.includes(key))) {
      return res
        .status(400)
        .json({ message: "You are going against the schema!" });
    }
   
    let arr = Object.entries(req.body)
    .map(([key,value]) => {if (typeof value !== 'number') return `${key} = '${value}'`;
      else return `${key} = ${value}`;
    });
    
   await databaseConnection.query(
      `update data set ${arr} where dataId = ?`,
      [dataId]
    );
    return res.status(200).json({message : "Expense has been edited successfully!"})
    

  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export default editExpense;
