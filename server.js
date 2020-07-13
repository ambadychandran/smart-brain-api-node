const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/regiester');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 
const db = knex({
  	client: 'pg',
  	connection: {
    connectionString : process.env.DATABASE_URL,
    ssl:true
  }
});

const app = express();
app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(cors());

const database = {
	users:[
		{
			id:'123',
			name:'John',
			email:'john@xyz.com',
			entries:0,
			password:'cookies',
			joind:new Date()
		},
		{
			id:'124',
			name:'Sally',
			email:'sally@xyz.com',
			password:'bananas',
			entries:0,
			joind:new Date()
		}
	]
}

app.get('/',(req,res)=>{
	res.send(database.users);
})

app.post('/signin',signin.handleSignin(db,bcrypt))

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)})

app.put('/image',(req,res)=>{image.handleImage(req,res,db)})

app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})

const PORT =5000;

app.listen(process.env.PORT || 5000,()=>{
	console.log(`app is running ${PORT}`);
})


