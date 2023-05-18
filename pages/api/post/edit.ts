import { connectDB } from "@/util/database";
import { ObjectIdLike } from "bson";
import { ObjectId } from "mongodb";

export default async function handler(req: { method: string; body: { title: any; content: any; _id: string | number | ObjectId | ObjectIdLike | Uint8Array | undefined; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: string): any; new(): any; }; }; redirect: (arg0: number, arg1: string) => void; }) {
  if (req.method == "POST") {
    if (!req.body.title) {
      return res.status(500).json("제목쓰세요");
    }
    let clone = {
      title: req.body.title,
      content: req.body.content,
    };
    const db = (await connectDB).db("forum");
    let result = await db
      .collection("post")
      .updateOne({ _id: new ObjectId(req.body._id) }, { $set: clone });
    console.log(req.body);
    res.redirect(302, "/list");
  }
}