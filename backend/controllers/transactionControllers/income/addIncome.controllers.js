import databaseConnection from "../../../dbCredentials/db.connection.js";


const addIncome = async (req,res) => {
  try {

    const {userId} = req;
    
    let {income,category,description,account} = req.body;
    
    account = account || 'cash';

    const addIncomeQuery = await databaseConnection.query(
      "insert into data(userId,income,expense,category,description,account,date) values(?,?,0,?,?,?,now())"
      ,[userId,income,category,description,account]
    )
    
    res.send({message: "data entered suceesfully"});
    
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({message: "Internal server error"});
    
  }
    

}

 export default addIncome