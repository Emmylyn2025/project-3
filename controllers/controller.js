const User = require('../database/databaseSchema');
const qs = require('qs');

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

const fieldUsers = async(req, res) => {
  try{
    // The Filter and use the query paser, so that the [gte] and others can be understandable by express
    const parsed = qs.parse(req.query);
  
    let queryObj = {...parsed};
    
    const exclude = ["fields", "sort", "page", "limit"];

    exclude.forEach(el => delete queryObj[el]);

    //Make it a string
    let queryStr = JSON.stringify(queryObj);

    //Make it look like the filter in mongoose
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    let queryObject = JSON.parse(queryStr);
    
    //filter Query
    let query = User.find(queryObject);

    //Fields Limits
    if(req.query.fields) {
      const fields = req.query.fields?.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    //Sortings
    if(req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy)
    } else {
      query = query.sort("-createdAt");
    }

    //Pagination, skip, and limits
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 2;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);
    

    // Query
    const users = await query;

    if(!users) {
      return res.status(404).json({
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


module.exports = { postUsers, viewAll, allUsers, fieldUsers }