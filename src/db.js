require('dotenv').config();
const mongoose = require('mongoose');

async function main() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`);
  console.log('Connected to MongoDB');
}

main().catch(err => console.error(err));