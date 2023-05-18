import { connectDB } from "@/util/database";
import Link from "next/link";
import DetailLink from "./DetailLink";
import ListItem from "./ListItem";

export const dynamic = "force-dynamic";

 

const List = async () => {
  const db = (await connectDB).db("forum");
  const result = await db.collection("post").find().toArray();

  console.log(12,result)
  return (
    <div className="list-bg">
      <ListItem result={result} />
    </div>
  );
};

export default List;