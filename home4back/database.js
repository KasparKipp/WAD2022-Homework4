const Pool = require('pg').Pool;

const pool = new Pool({
    user:"postgres",
    password: "",
    database: "postgres",
    host: "localhost",
    port: "5432"
})

const execute = async(query) => {
    try {
        await pool.connect()
        await pool.query(query)
        return true
    } catch (err) {
        console.error(err.stack)
        return false
    }
}

const createTblQuery = `
    CREATE TABLE IF NOT EXISTS "posts" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        
    )`