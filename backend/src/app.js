
const express = require("express");
const app = express();
const usersRouter = require("./routes/users.route.js");
const cookieParser = require('cookie-parser')
const cors = require("cors");
const eventsRouter = require("./routes/events.route.js");
const categoriesRouter = require("./routes/categories.route.js");
const { languagesRouter } = require("./routes/languages.route.js");

app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
    "methods": "GET,PUT,PATCH,POST,DELETE",
    //to allow the server to set and receive cookies in the browser (for authentication)
    credentials: true,
}))

//[security practices]
//limit the json size
app.use(express.json({ limit: "20kb" }))

//to decode the url (sometimes spaces treated as %20 or +)
app.use(express.urlencoded({ extended: true }));

//static files 
app.use(express.static("public"));

//parse cookies (only server can read and delete the cookies)
app.use(cookieParser());


//routes imports
app.get("/",(req,res) => {
    res.send("hello from event management server!");
})

app.use("/api/auth", usersRouter);
app.use("/api/events", eventsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/languages", languagesRouter);

module.exports = app;