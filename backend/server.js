const app = require('./app')
const connectDatabase = require('./config/database')

const dotenv = require('dotenv');

//setting up config file
dotenv.config({ path: 'backend/config/config.env' })

//connecting to databse

connectDatabase();

app.listen(process.env.PORT, () => {
    console.log("Server started on PORT", process.env.PORT);
})