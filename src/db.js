require('dotenv').config();
const mongoose= require("mongoose");

const {
    DB_USER,
    DB_PASSWORD,
    DB_CLUSTER,
    DB_NAME
  } = process.env;

main().catch(console.error);

async function main() {
    mongoose.set('strictQuery', true);
    await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`);
    console.log("connected to db")
  }
  
