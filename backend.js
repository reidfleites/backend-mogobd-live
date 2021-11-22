import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3100;
const mongoConnectString = process.env.MONGO_URI;

//const client = new MongoClient(mongoConnectString);
mongoose.connect(mongoConnectString,(err)=>{
	if(err){
		console.log("error to connect");
	}
	else{
		console.log("connection open");
	
		
	}
});
/*
const execMongo = async (done) => {
  await client.connect();
  const db = client.db("api001");
  done(db);
};
*/
/*
app.get("/", (req, res) => {
  execMongo(async (db) => {
    const users = await db
      .collection("users100")
      .find()
      .project({
        name: 1,
        username: 1,
        email: 1,
      })
      .toArray();
    res.json(users);
  });
});
*/
const userSchema = mongoose.Schema({
	name: String,
	username: String,
	email: String
});
const UserModel = mongoose.model("User", userSchema,"users100");


app.get("/",async(req,res)=>{
	const users=await UserModel.find({});
	res.json(users)
		
	});

/////////////////////////////////////////////////////////
/*
app.delete('/deleteuser/:id', (req, res) => {
	const id = req.params.id;
    console.log(id);
	execMongo(async (db) => {
		const deleteResult = await db.collection('users100').deleteOne({ _id: new mongodb.ObjectId(id) });
		res.json({
			result: deleteResult
		})
	});
});
*/
/////////////////////////////////////////////////////////

app.delete("/deleteuser/:id",async(req,res)=>{
	
	const ObjectId=mongoose.Types.ObjectId;
	const id=req.params.id;
	const result =await UserModel.deleteOne({_id:ObjectId(id)})
	res.json({message:result})
})
/*
app.post('/adduser', (req, res) => {
	const user = req.body.user;
	execMongo(async (db) => {
		const insertResult = await db.collection('users100').insertOne(user);
		res.json({
			result: insertResult
		});
	});
});
*/
//////////////////////////////////////////
app.post('/adduser',async(req,res)=>{
		const user= new UserModel({
		name:req.body.user.name,
		username:req.body.user.username,
		email:req.body.user.email
	});
	user.save(err=>{
		if(err){
			res.json({error:"can not add user"})
		}
		else{
			res.json({message:"user added"})
		}
	})
})

/*
app.patch('/edituser/:id', (req, res) => {
	const id = req.params.id;
	const email = req.body.email;
	console.log(email);
	execMongo(async (db) => {
		const updateResult = await db.collection('users100').updateOne({ _id: new mongodb.ObjectId(id) }, { $set: { email } });
		res.json({
			result: updateResult
		})
	});
});
*/
//////////////////////////////////////
app.patch('/edituser/:id',async(req,res)=>{
	const ObjectId=mongoose.Types.ObjectId;
	const id=req.params.id;
	const email=req.body.email;
	const deleted=await UserModel.findByIdAndUpdate({_id:ObjectId(id)},{$set:{email:email}})
	res.json({mesagge:deleted})
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
