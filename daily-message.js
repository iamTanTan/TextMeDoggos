// Imports
require("dotenv").config();

const cron = require("node-cron");
const sendDailyDogMessage = require("./api/twilio-multisend-api.js");
const mongoose = require("mongoose");

mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

cron.schedule(
    "0 8 * * *",
    async () => {
        await sendDailyDogMessage();
        console.log("daily message sent");
    },
    {
        scheduled: true,
        timezone: "America/Sao_Paulo",
    }
);
