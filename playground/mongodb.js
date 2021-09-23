// const mongodb = require("mongodb")
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID
const {MongoClient, ObjectId} = require("mongodb")

const connectionUrl="mongodb://127.0.0.1:27017"
const databaseName="task-manager"
// const id =  ObjectId().valueOf()
// const ts =  new ObjectId().getTimestamp()
// console.log(id)
// console.log(ts)
MongoClient.connect(connectionUrl,{useNewUrlParser: true},(error,client)=>{
  if(error){
    return console.log("unable to connect")
  }

  const db = client.db(databaseName)

  // UPDATE VIA PROMISE
  // const updatePromise = db.collection("users")
  //                       .updateOne({_id : ObjectId("614056be59745ed81cfbf9ea")},
  //                       {$set: {age: 4}})
  // updatePromise.then((result)=>{console.log(result)})
  //              .catch((error)=>{console.log(error)})
  // UPDATE MANY
  // const updatePromise = db.collection("tasks")
  //                       .updateMany({completed : false},
  //                       {$set: {completed: true}})
  // updatePromise.then((result)=>{console.log(result)})
  //              .catch((error)=>{console.log(error)})

//DELETE
// db.collection("users")
//   .deleteOne({_id : ObjectId("6141a28e688b4aafc6c376e9")})
//   .then((result)=>{console.log(result)})
//   .catch((error)=>{console.log(error)})

  db.collection("users")
  .deleteMany({age: "21"})
  .then((result)=>{console.log(result)})
  .catch((error)=>{console.log(error)})

  // db.collection("users").findOne({_id: new ObjectId("614056be59745ed81cfbf9e9")},(error,user)=>{
//   if(error) return console.log("error in findOne")

//   console.log(user)
// })
//TASK FIND ONE
// db.collection("tasks").findOne({_id: ObjectId("614184d881d5d4760067fab8")},(error,task)=>{
//   if(error) {return console.log("error in find")}
//   console.log(task)
// })
//TASK FIND ALL
// db.collection("tasks").find({completed: false}).toArray((error,tasks)=>{
//   if(error) {return console.log("error in find")}
//   console.log(tasks)
// })

//READ
  // db.collection("users").insertOne({name: "mindae3",age: "11"},(error,result)=>{
  //   if(error) {return console.log("error while insertOne")}

  //   console.log("result.ops: "+result.acknowledged)
  //   console.log("result.ops: "+result.insertedId)
  // })

  //   db.collection("users").insertMany([{name:"cherry",age:10},{name:"daisy",age:5}],
  //       (error,result)=>{
  //         if(error) return console.log("error in insertMany")

  //         console.log(result.insertedCount)
  //         console.log(result.insertedIds)
  //         console.log(result.acknowledged)
  //       })
//   db.collection("tasks").insertMany(
//         [
//             {task:"buy grossery",completed:true},
//             {task:"car service",completed:false},
//             {task:"read novel",completed:false}
//         ],
//         (error,result)=>{
//           if(error) return console.log("error in insertMany")

//           console.log(result.insertedCount)
//           console.log(result.insertedIds)
//           console.log(result.acknowledged)
//         })

  console.log("connected to mongodb from nodejs")  
})