import databaseConnection from "../../../dbCredentials/db.connection.js";

const addExpense = async (req,res) => {
  try {
    
    const {userId} = req;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized User" });
    }
    let {expense,category,description,account} = req.body;
    if (!expense) {
      return res.status(400).json({ message: "Expense value is complusory, others are optional!" });

    }
    account = account || 'cash';

    const addExpenseQuery = databaseConnection.query(
      "insert into data(userId,income,expense,category,description,account,date) values(?,0,?,?,?,?,now())"
      ,[userId,expense,category,description,account]
    )
    
    res.send({message: "Expense has been inserted successfully!"});


  } catch (error) {
    return res.status(500).json({message: "Internal server error"});

  }
    

}

 export default addExpense;