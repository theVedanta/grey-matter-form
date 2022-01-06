const mongoose = require("mongoose");

const RegSchema = new mongoose.Schema({
    participants: { type: Array, required: true },
    school: { type: String, required: true },
    teacher: { type: Object, required: true },
});

const Reg = mongoose.model("registration", RegSchema);
module.exports = Reg;
