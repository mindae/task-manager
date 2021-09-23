const mongoose = require("mongoose")
// const validator = require("validator")

mongoose.connect(
  "mongodb://127.0.0.1:27017/task-manager-api",
  {
      useNewUrlParser: true
  }  
)

//sample data object for User and Task 
// const user = new User({
//   name: "  Appu  ",
//   email: "appu@example.com",
//   password: "pass"
// })
// const tasks = new Tasks({
//   description: "   fix car   ",
//   completed: false
// })