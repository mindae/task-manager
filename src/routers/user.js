const User = require("../models/user")
const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
/////////////// USER  /////////////////
//create user
router.post('/users',async (req,res)=>{
  const user = new User(req.body)
  try{
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({user,token})
  }catch(error){
    res.status(400).send(error)
  }

  // user.save()
  //   .then((user)=>{
  //       response.status(201).send(user)
  //   })
  //   .catch((error)=>{
  //       response.status(400).send(error)
  //       //response.send(error)
  //   })
  // //response.send(request.body)
})
//User Profile - findMany users //middleware/filter - repurposed to self
router.get("/users/self",auth,async(request,response)=>{
// try {
//   const users = await User.find({})
//   response.send(users)
// } catch (error) {
//   response.status(500).send(error)
// }
console.log('self user:',request.user);
response.send(request.user)
  
  // User.find({})
    //     .then((users)=>{
    //         response.send(users)
    //     })
    //     .catch((error)=>{
    //         response.status(500).send(error)
    //     })
})
//logout - single session
router.post('/users/logout',auth, async (req,res)=>{
    try {
          req.user.tokens = req.user.tokens.filter((token)=>{
              return token.token !== req.token
          })
          await req.user.save()
          res.send()
    } catch (error) {
      res.status(500).send()
    }
})
//logout - ALL sessions
router.post('/users/logoutAll',auth, async (req,res)=>{
  try {
        req.user.tokens = []
        
        await req.user.save()
        res.send()
  } catch (error) {
    res.status(500).send()
  }
})

////findOne user - not needed since we have user profile
// router.get('/users/:id',async(req,res)=>{
//   // console.log(req.params)
//   // console.log(req.params.id)
//   const id = req.params.id
//   try{
//         const user = await User.findById(id)
//         if(!user){
//           return res.status(404).send()
//         }
//         res.send(user)
//   }catch(e){
//     res.status(500).send(e)
//   }
//   // User.findById(id)
//   //     .then((user)=>{
//   //         if(!user){
//   //           return res.status(404).send()
//   //         }
//   //         res.send(user)
//   //       })
//   //     .catch((error)=>{
//   //           res.status(500).send(error)
//   //       })
// })

//patch - update
// router.patch("/users/:id",async(req,res)=>{
router.patch("/users/self",auth,async(req,res)=>{
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    return res.status(400).send({error: "request object empty"})
  }
  // console.log(req.body);
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name','email','password','age']
  const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))
  if(!isValidOperation){
    return res.status(400).send({error: "invalid update"})
  }
  try {

       //const user = await User.findByIdAndUpdate(req.params.id, req.body,{new: true, runValidators: true})
      //  const user = await User.findById(req.params.id)
      //  if(!user){
      //   return res.status(404).send()
      //  }  
       updates.forEach((update)=>{
         req.user[update] = req.body[update]
       })
       await req.user.save()
        
       res.send(req.user)
  } catch (error) {
    res.status(400).send(error)
  }
})

//delete user
router.delete('/users/self',auth, async(req,res)=>{
  try {
    // const user = await User.findByIdAndDelete(req.params.id)
    // const user = await User.findByIdAndDelete(req.user.id)
    // if (!user) {
    //   res.status(404).send('user not found')
    // }
    await req.user.remove()
    res.send(req.user)
  } catch (error) {
    res.status(500).send(error)
  }
})

//Login
router.post('/users/login',async (req,res)=>{
  try {
      const user = await User.findUserByCredentials(req.body.email,req.body.password)
      const token = await user.generateAuthToken()
      // res.send({user: user.getPublicProfile(),token: token})
      res.send({user: user,token: token})
  } catch (error) {
    res.status(401).send()
  }
})


module.exports = router