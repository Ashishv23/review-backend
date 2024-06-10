import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
// import ReviewsDAO from "./dao/reviewsDAO.js"

dotenv.config();

const mongoClient = mongodb.MongoClient;
const mongo_username = process.env.DB_USERNAME;
const mongo_passwrod = process.env.DB_PASSWORD;
const uri = `mongodb+srv://${mongo_username}:${mongo_passwrod}@cluster0.0qliqrh.mongodb.net/`

const port = 8000;

mongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        // useNewUrlParser: true
    }
).catch(err => {
    console.error(err.stack);
    process.exit(1);
}).then(async client => {
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });
});