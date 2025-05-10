const path = require('path');
//configure environment variables
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });
const app = require('./app.js');
const { PORT } = require('./constants.js');
const dbConnect = require('./db/dbConnect.js');


dbConnect().then((dbInstance) => {
    app.listen(PORT, () => {
        console.log("Database connected and App Started!");
    })
})

dbConnect().catch(() => {
    console.log("something went wrong while starting the server!"); 
})



