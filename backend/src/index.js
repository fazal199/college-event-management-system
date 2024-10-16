const app = require('./app.js');
const { PORT } = require('./constants.js');
const dbConnect = require('./db/dbConnect.js');


dbConnect().then((dbInstance) => {
    app.listen(PORT || 3000, () => {
        console.log("app started on localhost:!");
    })
})

dbConnect().catch(() => {
    console.log("something went wrong while starting the server!");
    
})



