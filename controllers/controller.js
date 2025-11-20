const User = require('../database/databaseSchema');


const postUsers = async(req, res) => {
  try{

    const {name, school, age} = req.body;

    const user = await User.create({
      name,
      school,
      age
    });

    if(!user) {
      return res.status(400).json({
        message: "You made some bad request plase try again"
      });
    }

    res.status(200).json({
      message: 'User added successfully',
      user
    });

  } catch(error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong please try again later"
    });
  }
}

const viewAll = async(req, res) => {
  try{

    let queryObject = {};

    //Age rangeing query
    if(req.query.minAge) {
      queryObject.age = {$gte: req.query.minAge}
    }

    if(req.query.maxAge) {
      queryObject.age = {
        ...queryObject.age,
        $lte: req.query.maxAge
      }
    }

    const allUsers = await User.find(queryObject);

    if(!allUsers) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({allUsers});

  } catch(error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong plase try again later"
    });
  }
}

const allUsers = async(req, res) => {
  try{

    const query = req.query;

    const users = await User.find(query);

    if(!users) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    res.status(200).json(users);

  } catch(error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong please try again later"
    });
  }
}


module.exports = { postUsers, viewAll, allUsers }