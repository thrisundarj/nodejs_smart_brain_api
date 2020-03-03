const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')

const app = express();

const database =  {
	users: [
		 {
		 	id: '1',
		 	name: 'thrisundar',
		 	email: 'thrisundar@gmail.com',
		 	password: 'thri@123',
		 	entries: 0,
		 	joined: new Date()
		 }
	]
}

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.json(database.users)
})

app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) {
		res.json(database.users[0]);
	} else {
		res.status(400).json('error logging in')
	}
})

app.post('/register', (req, res) => {
	const {email, name, password} = req.body;

	database.users.push({
		id: '2',
		name: name,
		email: email,
		entries: 0,
		joined: new Date()
	})
	res.json("Sucessfully registered")
})

app.get('/profile/:id', (req, res) => {
	const {id} = req.params;
	let found = false;

	database.users.forEach( user => {
		if (user.id === id){
			found = true;
			return res.json(user);
		}
	})

	if (!found) {
		res.status(404).json('No such user');
	}
})

app.put('/image', (req, res) => {
	const {id} = req.body;
	let found = false;

	database.users.forEach( user => {
		if (user.id === id){
			found = true;
			user.entries++
			return res.json(user.entries);
		}
	})

	if (!found) {
		res.status(404).json('Not found');
	}
})

app.listen(3001, () => {
	console.log('App is running in 3001')
})
