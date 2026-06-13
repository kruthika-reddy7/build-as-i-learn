const {Pool}= require('pg');
require('dotenv').config()
const pool = new Pool ({
    user:"postgres",
    host:"localhost",
    database:"auth_app",
    password:process.env.db_password,
    port:5432
})

module.exports=pool