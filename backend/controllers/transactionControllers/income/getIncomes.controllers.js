import databaseConnection from "../../../dbCredentials/db.connection.js";

const getIncome = async (req,res) => {
  try {
    
    const {userId} = req;
    
   
   

    const [getIncomeQuery] = await databaseConnection.query(
      "select dataId,income,category,description,account,date from data where userId = ? && income != 0"
      ,[userId]
    )
    
    res.send(getIncomeQuery);
    
    


  } catch (error) {
    return res.status(500).json({message: "Internal server error"});

  }
    

}

 export default getIncome;