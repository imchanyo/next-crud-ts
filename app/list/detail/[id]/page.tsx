import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

type PropsType = {
  params : {
    id: string,
    searchParams? : {}
  }
}

const Detail = async (props : PropsType) => {
  console.log(5,props)
  const db = (await connectDB).db("forum");
  const result = await db.collection("post").findOne({
    _id: new ObjectId(props.params.id),
  });

 
  return (
    <div>
      <h3>상세페이지</h3>
      <h3>{result.title}</h3>
      <p>{result.content}</p>
    </div>
  );
};

export default Detail;