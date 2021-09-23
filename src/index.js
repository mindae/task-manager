require('./db/mongoose')
require('./models/Task')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const express = require('express')
const app = express()
const port = process.env.PORT||3000

//GET DISABLED - MIDDLEWARE/FILER(in Java) to intercept GET request
// app.use((req,res,next)=>{
//   if (req.method === "GET") {
//     res.send("GET methods are disabled")
//   }
//   next()
// })
//ALL HTTP METHODS - maintainence mode MIDDLEWARE/FILER(in Java) to intercept ALL request 
// app.use((req,res,next)=>{
//     res.status(503).send("site is under maintainence. Check back soon!")
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

//server listening port for express
app.listen(port, ()=>{
  console.log(`server is up on port ${port}`)
})

const Task = require('./models/Task')
const User = require('./models/user')
const main = async () => {
  const user = await User.findById('6149c5bc84e389a444612991')
  await user.populate('tasks')
  
  console.log(user.tasks);
}

main()