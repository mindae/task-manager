require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/Task')
const { findByIdAndDelete, countDocuments } = require('../src/models/Task')

//user
// const userid = "61430cb3c40d9f6881494f44"
// User.findByIdAndUpdate(userid,{age: 10})
//     .then((user)=>{
//       console.log(user)
//       return User.countDocuments({age: 10})
//     })
//     .then((result)=>{
//       console.log(result)
//     })
//     .catch((e)=>{console.log(e)})
const updateAgeAndCount=async (id,age)=>{
    const user = await User.findByIdAndUpdate(id,{age})
    const count = await User.countDocuments({age})
    return count
}
// updateAgeAndCount("6143036ff001a18971f13fdf",38).then((count)=>{
//   console.log("count: ",count)
// }).catch((error)=>{
//   console.log(error)
// })

const deleteTaskAndCount = async (taskId)=>{
  const task = await Task.findByIdAndDelete(taskId)
  const count = await Task.countDocuments({completed:false})
  return [task, count]
}
deleteTaskAndCount("6143eba5654825df31672283").then((count)=>{
  console.log(count);
}).catch((error)=>{
  console.log(error);
})
// //task
// const taskid = '614469bce836dfd49f4f6a6b'
// Task.findByIdAndDelete(taskid)
// .then((task)=>{
//   console.log(task)
//   return Task.countDocuments({completed: false})
// })
// .then((count)=>{console.log(count)})
// .catch((e)=>{console.log(e)}) 