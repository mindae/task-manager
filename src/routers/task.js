const Task = require('../models/Task')
const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')


//////////////////////  TASK  //////////////
//create task
router.post('/tasks',auth,async (request,response)=>{
    // const task = new Task(request.body)
    const task = new Task({
      ...request.body,
      owner: request.user.id
    })
    try {
          await task.save()
          response.status(201).send(task)
    } catch (error) {
      response.status(400).send(error)
    }
    
    // task.save()
    //     .then((task)=>{
    //         response.status(201).send(task)    
    //     })
    //     .catch((error)=>{
    //         response.status(400).send(error)
    //     })
})

//findOne task
router.get("/tasks/:id",async(req,res)=>{
try {
      const task = await Task.findById(req.params.id)   
      if (!task) {
        return res.status(404).send()
      }  
      res.send(task)
} catch (error) {
      res.status(500).send(error)
}


// Task.findById(req.params.id)
  //     .then((task)=>{
  //         if(!task){
  //           return res.status(404).send()
  //         }
  //         res.send(task)
  //     })
  //     .catch((error)=>{
  //         res.status(500).send(error)
  //     })
})
//findMany tasks
router.get("/tasks",async(req,res)=>{
  try {
    const tasks = await Task.find({})
    res.send(tasks)
  } catch (error) {
    res.status(500).send(error)
  }

  // Task.find({})
  //     .then((tasks)=>{
  //         res.send(tasks)
  //     })
  //     .catch((error)=>{
  //         res.status(500).send(error)
  //     })
})

//update//patch 
router.patch('/tasks/:id',async (req,res)=>{
  if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.status(400).send('Request object missing');
  }
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description','completed']
  const isValidOperation = updates.every(update => allowedUpdates.includes(update))
  if(!isValidOperation){
    return res.status(400).send('invalid updates!')
  }
  try {
    // const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new: true, runValidators: true})
    const task = await Task.findById(req.params.id)
    if(!task){
      return res.status(404).send('task not found')
    }
    updates.forEach((update)=>{
        task[update] = req.body[update]
    })
    await task.save()
    res.send(task)
  } catch (error) {
    res.status(400).send(error)
  }
})

//delete task
router.delete('/tasks/:id',async(req,res)=>{
try {
  const task = await Task.findByIdAndDelete(req.params.id)
  if (!task) {
    res.status(404).send('task not found')
  }
  res.send(task)
} catch (error) {
  res.status(500).send(error)
}
})

module.exports = router