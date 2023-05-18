import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

type PropsType = {
  params : {
    id: string,
    searchParams? : {}
  }
}

const Edit = async (props : PropsType) => {
  const db = (await connectDB).db("forum");
  const result = await db.collection("post").findOne({
    _id: new ObjectId(props.params.id),
  });

  await db.collection("post").updateOne(
    {
      _id: new ObjectId(props.params.id),
    },
    {
      $set: {
        title: "",
        content: "",
      },
    }
  );
  return (
    <div className="p-20">
      <h4>글수정</h4>
      <form action="/api/post/edit" method="POST">
        <input name="title" placeholder="글제목" defaultValue={result.title} />
        <input
          name="content"
          placeholder="글내용"
          defaultValue={result.content}
        />
        <input
          style={{ display: "none " }}
          name="_id"
          defaultValue={result._id.toString()}
        />
        <button type="submit">전송</button>
      </form>
    </div>
  );
};

export default Edit;