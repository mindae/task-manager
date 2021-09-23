const jwt = require('jsonwebtoken')
const { findOne } = require('../models/user')
const User = require('../models/user')
const auth = async (req,res,next)=>{
try {
  const token = req.header('Authorization').replace('Bearer ','')
  
  const decoded = jwt.verify(token,'thisismindae')
  
  const user = await User.findOne({id: decoded.id, 'tokens.token':token})
  if(!user) {
    throw new Error()
  }
  req.token=token
  req.user = user
  
  next()
  // console.log(token);
} catch (error) {
  res.status(401).send({error:'Please authenticate'})
}
}

module.exports = auth