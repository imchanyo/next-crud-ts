import { connectDB } from "@/util/database";
import { ObjectIdLike } from "bson";
import { ObjectId } from "mongodb";

export default async function handler(req: { method: string; body: string | number | ObjectId | ObjectIdLike | Uint8Array | undefined; }, res: { redirect: (arg0: number, arg1: string) => void; }) {
  if (req.method == "POST") {
    console.log(req.body);
    const db = (await connectDB).db("forum");
    const result = await db
      .collection("post")
      .deleteOne({ _id: new ObjectId(req.body) });
    console.log(9, result);
    res.redirect(302, "/list");
  }
}