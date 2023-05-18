import { MongoClient } from "mongodb";
const url =
  "mongodb+srv://admin:1234@cluster0.vayaufq.mongodb.net/?retryWrites=true&w=majority";
const options = { useNewUrlParser: true };
let connectDB : any;



connectDB = new MongoClient(url, options as any).connect();
export { connectDB };