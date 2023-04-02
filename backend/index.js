import app from "./app.js";
import dotenv from 'dotenv';
import connectToDb from "./config/db.js";

dotenv.config({ path: "config/config.env" });

connectToDb();
const PORT = process.env.PORT | 5000;

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});