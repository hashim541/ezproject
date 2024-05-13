require('dotenv').config();
const { Pool } = require('pg');

const conUrl = process.env.DB_URL;

const pool = new Pool({
    connectionString:conUrl,
})

// pool.query('CREATE INDEX pro_lang_name_i ON pro_lang(name)',(err,res) => {
//     if(err){
//         console.log(err)
//     }
//     console.log(res)
// })

module.exports = pool;