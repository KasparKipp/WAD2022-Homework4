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

const maxAge = "1h" // jwt token expires in an hour

const generateJWT = (id) => {
	return jwt.sign({ id }, secret, { expiresIn: maxAge });
	//jwt.sign(payload, secret, [options, callback]), and it returns the JWT as string
};


app.listen(port, () => {
    console.log(`Server is listening on port ${ port }.`)
})

// TODO: configure routes for our social media app

// GET all posts
app.get("/posts", async (req, res) => {
	try {
		const token = req.cookies.jwt;
		// This throws error if jwt.verify fails. 
		const is_auth = jwt.verify(token, secret)
		// console.log("User is authorised")
		const posts = await pool.query(
			// insert the user and the hashed password into the database
			"SELECT * FROM posts ORDER BY 1 "
		);
		
		res.status(201).json({
			posts: posts,
		}).send;
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
})
// GET post by id
app.get("/posts/:id", async (req, res) => {
	try {
		
		const token = req.cookies.jwt;
		const id = req.params.id
		console.log("Getting post with id: ", id);
		// This throws error if jwt.verify fails.
		const is_auth = jwt.verify(token, secret);
		const post = await pool.query(
			// insert the user and the hashed password into the database
			"SELECT * FROM posts WHERE id = $1", [id]
		);
		res.status(201).json({
			post: post,
		}).send;
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
})
// Add post
app.post("/posts", async (req, res) => {

	try {
		console.log("adding a post");
		const token = req.cookies.jwt;
		const { img, body } = req.body;
		
		const is_auth = jwt.verify(token, secret);
		console.log(`Value of is_auth: ${is_auth}`);

		const userPost = await pool.query(
			// insert the user and the hashed password into the database
			"INSERT INTO posts(img, body) values ($1, $2) RETURNING *",
			[img, body]
		);
		console.log("Posts: ", userPost.rows)
		if (userPost.rows.length === 0) {
			console.log("postitust ei lisatud")
			return res.status(401).json({ error: "Post was not added" });
		}
		token = generateJWT(userPost.rows[0].userid);
		res.status(201).cookie("jwt", token, { maxAge: 6000000, httpOnly: true }).json({
			user_id: userPost.rows[0].userid,
		}).send;
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
})


// Update post
app.put("/posts/:id", async (req, res) => {
	try {
		console.log("Updating a post");
		const token = req.cookies.jwt;
		const { img, body } = req.body;
		const id = req.params.id
		console.log("---------");
		console.log("img: ", img, "\n body: ", body);
		console.log("---------");
		const is_auth = jwt.verify(token, secret);
		console.log(`Value of is_auth: ${is_auth}`);

		const userPost = await pool.query(
			// insert the user and the hashed password into the database
			"UPDATE posts SET img=$1, body=$2 where id=$3 RETURNING *",
			[img, body, id]
		);
		console.log("Posts: ", userPost.rows);
		if (userPost.rows.length === 0) {
			console.log("postitust ei lisatud");
			return res.status(401).json({ error: "Post was not added" });
		}
		token = generateJWT(userPost.rows[0].userid);
		res.status(201).cookie("jwt", token, { maxAge: 6000000, httpOnly: true }).json({
			user_id: userPost.rows[0].userid,
		}).send;
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
});
// Delete all posts:
app.delete("/posts", async (req, res) => {
	try {
		console.log("Deleting all posts");
		const token = req.cookies.jwt;
		// If not auth this will throw
		const is_auth = jwt.verify(token, secret);

		const deletePost = await pool.query(
			// insert the user and the hashed password into the database
			"TRUNCATE posts"
		);
		res.status(204).cookie("jwt", token, { maxAge: 6000000, httpOnly: true }).send;
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
});

// Delete a post by id:
app.delete('/posts/:id', async (req, res) => {
	try {
		const token = req.cookies.jwt;
		const id = req.params.id
		console.log("Deleting post", id);
		// If not auth this will throw
		const is_auth = jwt.verify(token, secret);

		const deletebyId = await pool.query(
			// insert the user and the hashed password into the database
			"DELETE FROM posts where id = $1", [id]
		);
		res.status(204).cookie("jwt", token, { maxAge: 6000000, httpOnly: true }).send;
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
});

/* Social media app routes start */

// POST login
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
// POST Signup
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
// get isAuth API for frontend
app.get("/auth/authenticate", async (req, res) => {
	//console.log("authentication request has been arrived");
	const token = req.cookies.jwt; // assign the token named jwt to the token const

	try {
		if (token) {
			//checks if the token exists
			//jwt.verify(token, secretOrPublicKey, [options, callback]) verify a token
			await jwt.verify(token, secret, (err) => {
				//token exists, now we try to verify it
				if (err) {
					// not verified, redirect to login page
					console.log("token is not verified\n",err.message);
					//console.log();
					res.send({ authenticated: false }); // authenticated = false
				} else {
					// token exists and it is verified
					//console.log("author is authinticated");
					res.send({ authenticated: true }); // authenticated = true
				}
			})
		} else {
			//applies when the token does not exist
			//console.log("author is not authinticated");
			res.send({ authenticated: false }); // authenticated = false
		}
	} catch (err) {
		console.error(err.message);
		res.status(400).send(err.message);
	}
})

//logout a user = deletes the jwt
app.get('/auth/logout', (req, res) => {
    console.log('delete jwt request arrived');
	// QUESTION: using the clearCookie method user remained logged in, why?
    res.status(202).cookie('jwt', '', { maxAge: 1}).json({ "Msg": "cookie cleared" }).send
})

/* Social media app routes end */