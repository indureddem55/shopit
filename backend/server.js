const app = require('./app')
const connectDatabase = require('./config/database')

const dotenv = require('dotenv');

//Handle uncaught exception

process.on('uncaughtException', err => {
    console.log('ERROR:', err.stack);
    console.log('shutting down the server due to uncaught exception');
    process.exit(1);
   
})

//setting up config file
dotenv.config({ path: 'backend/config/config.env' })

//connecting to databse

connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log("Server started on PORT", process.env.PORT);
})

//Handle unhandled rejections

process.on('unhandledRejection', err => {
    console.log('ERROR:', err.message);
    console.log('shutting down the server due to unhandled promise rejection');
    server.close(() => {
        process.exit(1);
    });
})
