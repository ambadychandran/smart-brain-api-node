const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');


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

app.post('/signin',(req,res)=>{
	// bcrypt.compare("apples",'$2a$10$QwieXG0J2yEDxSaoS5nFjuINhV.c1LNtqhGyVRVAAJGYF3b6d5BC6',(err,res)=>{
	//   console.log("first guess",res);
	// });
	// bcrypt.compare("veggies",'$2a$10$QwieXG0J2yEDxSaoS5nFjuINhV.c1LNtqhGyVRVAAJGYF3b6d5BC6',(err,res)=>{
	//   console.log("secoend guess",res);
	// });
	if (req.body.email === database.users[0].email && 
		req.body.password === database.users[0].password) {
		res.json(database.users[0]);
	} else {
		res.status(400).json('error login in');
	}
})

app.post('/register',(req,res)=>{
	const { email, name , password} = req.body;
	// bcrypt.hash(password,null,null,(err,hash)=>{
	// 	console.log(hash);
	// })
	database.users.push({
		id:'125',
		name:name,
		email:email,
		password:password,
		entries:0,
		joind:new Date()
	})
	res.json(database.users[database.users.length-1]);

})

app.get('/profile/:id',(req,res)=>{
	const { id } = req.params;
	let found =false;
	database.users.forEach( user=> {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}
	})
	if (!found) {
		res.status(400).json('no records found');
	}
})

app.put('/image',(req,res)=>{
	const { id } = req.body;
	let found =false;
	database.users.forEach( user=> {
		if (user.id === id) {
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	})
	if (!found) {
		res.status(400).json('no records found');
	}
})


// bcrypt.compare("bacon",hash,(err,res)=>{
// 	//res == true
// });
// bcrypt.compare("veggies",hash,(err,res)=>{
// 	//res == faslse
// });

app.listen(5000,()=>{
	console.log('app is running 5000');
})

/*/ 
/ --> res= this is working
/signin --> POST success/fail
/regiester --> POST = user
/profile/:userId --> GEt = user
/image --> PUT --> user 
*/

