import { connectDB } from "@/util/database";

export default async function handler(req: { method: string; body: { title: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: string): any; new(): any; }; }; redirect: (arg0: number, arg1: string) => void; }) {
  if (req.method == "POST") {
    if (!req.body.title) {
      return res.status(500).json("제목쓰세요");
    }
    const db = (await connectDB).db("forum");
    const result = await db.collection("post").insertOne(req.body);
    res.redirect(302, "/list");
  }
}