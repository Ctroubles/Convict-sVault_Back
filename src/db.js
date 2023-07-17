require('dotenv').config();
const mongoose= require("mongoose");

const {
  DB_NAME, DB_PASSWORD,
} = process.env;

main().catch(err => console.log(err));


async function main() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(`mongodb+srv://tex_user:${DB_PASSWORD}@cluster0aws.reehusu.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,{ useNewUrlParser: true });
}