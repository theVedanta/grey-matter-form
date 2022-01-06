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
const Reg = require("./models/Reg");

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
app.get("/err", (req, res) => {
    res.send("<h1>Some error occurred</h1>");
});

app.post("/submit", async (req, res) => {
    const body = req.body;

    const reg = new Reg({
        participants: [
            {
                name: body["part-1"],
                phone: body["phone-1"],
                mail: body["mail-1"],
            },
            {
                name: body["part-2"],
                phone: body["phone-2"],
                mail: body["mail-2"],
            },
        ],
        school: body["school"],
        teacher: {
            name: body["teacher-name"],
            phone: body["teacher-phone"],
        },
    });

    try {
        await reg.save();
        res.redirect("/regged");
    } catch (err) {
        res.redirect("/err");
    }
});

app.get("/regged", (req, res) => {
    res.send("<h1>Registered</h1>");
});
