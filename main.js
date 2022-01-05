if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
const dbURI = process.env.DB_URL;
const cookieParser = require("cookie-parser");
const cors = require("cors");

// DB CONNECTION
async function connectDB() {
    await mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
}
connectDB();

// SETTINGS
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.use(cors());

// ROUTES
app.get("/", (req, res) => {
    res.render("index");
});
