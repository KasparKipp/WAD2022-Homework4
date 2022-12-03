const express = require('express')
const pool = require("./db/index.js");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// TODO: get port from config
const port = 3000 //process.env.PORT || 3000
const app = express()

// We allow requests from localhost:8080 and allow cookies to be included in requests
app.use(cors({ origin: "http://localhost:8080", credentials: true }))

app.use(express.json());
app.use(cookieParser()); 

const secret = "secret" // TODO: pick a stronger secret

const maxAge = 3600 // jwt token expires in an hour

// TODO: 
const generateJWT = (id) => {
	return jwt.sign({ id }, secret, { expiresIn: maxAge });
	//jwt.sign(payload, secret, [options, callback]), and it returns the JWT as string
};


app.listen(port, () => {
    console.log(`Server is listening on port ${ port }.`)
})

// TODO: configure routes for our social media app

/* Social media app routes start */

// TODO: Homepage route, Look up requirements from assignemnt

// TODO: login
app.post("/auth/login", async (req, res) => {
	try {
		console.log("a login request has arrived");
		const { email, password } = req.body;
		const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
		if (user.rows.length === 0) return res.status(401).json({ error: "User is not registered" });

		/* 
        To authenticate users, you will need to compare the password they provide with the one in the database. 
        bcrypt.compare() accepts the plain text password and the hash that you stored, along with a callback function. 
        That callback supplies an object containing any errors that occurred, and the overall result from the comparison. 
        If the password matches the hash, the result is true.

        bcrypt.compare method takes the first argument as a plain text and the second argument as a hash password. 
        If both are equal then it returns true else returns false.
        */

		//Checking if the password is correct
		const validPassword = await bcrypt.compare(password, user.rows[0].password);
		//console.log("validPassword:" + validPassword);
		if (!validPassword) return res.status(401).json({ error: "Incorrect password" });
		console.log(user.rows[0].id)
		const token = await generateJWT(user.rows[0].id);
        console.log(`Token: ${ token }`)
		res.status(201).cookie("jwt", token, { maxAge: 6000000, httpOnly: true }).json({ user_id: user.rows[0].id })
			.send;
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
})
// TODO: signup
app.post("/auth/signup", async (req, res) => {
	try {
		console.log("a signup request has arrived");
		//console.log(req.body);
		const { email, password } = req.body;

		const salt = await bcrypt.genSalt(); //  generates the salt, i.e., a random string

		const bcryptPassword = await bcrypt.hash(password, salt); // hash the password and the salt

		const authUser = await pool.query(
			// insert the user and the hashed password into the database
			"INSERT INTO users(email, password) values ($1, $2) RETURNING*",
			[email, bcryptPassword]
		);
		console.log(authUser);
		console.log(authUser.rows[0].id);
		const token = await generateJWT(authUser.rows[0].id); // generates a JWT by taking the user id as an input (payload)
		//console.log(token);
		//res.cookie("isAuthorized", true, { maxAge: 1000 * 60, httpOnly: true });
		//res.cookie('jwt', token, { maxAge: 6000000, httpOnly: true });
		res.status(201).cookie("jwt", token, { maxAge: 6000000, httpOnly: true }).json({ user_id: authUser.rows[0].id })
			.send;
	} catch (err) {
		console.error(err.message);
		res.status(400).send(err.message);
	}
})

// TODO: isAuth
app.get("/auth/authenticate", async (req, res) => {
	console.log("authentication request has been arrived");
	const token = req.cookies.jwt; // assign the token named jwt to the token const
	//console.log("token " + token);
	let authenticated = false; // a user is not authenticated until proven the opposite
	try {
		if (token) {
			//checks if the token exists
			//jwt.verify(token, secretOrPublicKey, [options, callback]) verify a token
			await jwt.verify(token, secret, (err) => {
				//token exists, now we try to verify it
				if (err) {
					// not verified, redirect to login page
					console.log(err.message);
					console.log("token is not verified");
					res.send({ authenticated: authenticated }); // authenticated = false
				} else {
					// token exists and it is verified
					console.log("author is authinticated");
					authenticated = true;
					res.send({ authenticated: authenticated }); // authenticated = true
				}
			});
		} else {
			//applies when the token does not exist
			console.log("author is not authinticated");
			res.send({ authenticated: authenticated }); // authenticated = false
		}
	} catch (err) {
		console.error(err.message);
		res.status(400).send(err.message);
	}
})

// TODO: logout
//logout a user = deletes the jwt
app.get('/auth/logout', (req, res) => {
    console.log('delete jwt request arrived');
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" }).send
})

/* Social media app routes end */