const mongoose = require("mongoose");
require("dotenv").config();

console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected!");
    process.exit(0);
})
.catch(err => {
    console.log(err);
    process.exit(1);
});