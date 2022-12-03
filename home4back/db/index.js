const { Pool } = require("pg");

const pool = new Pool({
	user: "postgres",
	password: "",
	database: "postgres",
	host: "localhost",
	port: "5432",
});

const execute = async (query) => {
	try {
		await pool.connect();
		await pool.query(query);
		return true;
	} catch (err) {
		console.error(err.stack);
		return false;
	}
};
// Create users Table query
const createUsersTblQuery = `
    CREATE TABLE IF NOT EXISTS "users" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL 
    );`;

// Create posts Table query
/*
const createPostsTblQuery = `
    CREATE TABLE IF NOT EXISTS "posts" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user uuid i
    )`;
*/

execute(createUsersTblQuery).then((result) => {
	if (result) {
		console.log('Table "users" is created');
	}
});

module.exports = pool;
