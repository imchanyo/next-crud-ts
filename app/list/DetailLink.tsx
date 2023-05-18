"use client";
import { useRouter } from "next/navigation";

const DetailLink = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.back();
      }}
    >
      버튼
    </button>
  );
};

export default DetailLink;
