"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import DetailLink from "./DetailLink";
 

type ListType = {
  _id: string;
  title: string;
  content: string;
}
const ListItem = ({ result } : {result : ListType[]} ) => {
  const router = useRouter()
  const handlerClick = (event: React.MouseEvent<HTMLButtonElement>, i: number ) => {
    let element = event.currentTarget.parentElement
   
    fetch("/api/post/delete", {
      method: "POST",
      body: result[i]._id,
    }).then(() => {    
      if(!element) return
      element.style.opacity = '0' ;    
      router.replace("/list");
    }).finally(()=> {
      if(!element) return
      element.style.display = '0' ;    
    });
  };
  return (
    <div>
      {result.map((el, i) => (
        <div key={el._id} className="list-item">
          <Link href={`list/detail/${el._id}`}>
            <h4>{el.title}</h4>
            <p>{el.content}</p>
          </Link>
          <Link href={`edit/${el._id}`}>edit</Link>
          <button
            onClick={(event) => handlerClick(event  , i) }
          >
            삭제
          </button>
          <DetailLink />
        </div>
      ))}
    </div>
  );
};

export default ListItem;