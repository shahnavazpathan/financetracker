import databaseConnection from "../../../dbCredentials/db.connection.js";

const addExpense = async (req,res) => {
  try {
    
    const {userId} = req;
    
    let {expense,category,description,account} = req.body;
    
    account = account || 'cash';

    const addExpenseQuery = databaseConnection.query(
      "insert into data(userId,income,expense,category,description,account,date) values(?,0,?,?,?,?,now())"
      ,[userId,expense,category,description,account]
    )
    
    res.send({message: "data entered suceesfully"});


  } catch (error) {
    return res.status(500).json({message: "Internal server error"});

  }
    

}

 export default addExpense;