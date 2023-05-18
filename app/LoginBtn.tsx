'use client';
import { signIn, signOut } from "next-auth/react";

const LoginBtn = ({name, email, image} : {name : string; email : string; image: string} ) => {
  console.log(55, name)
  return name ? (
    <>
      <div>{name}</div>
      <button
        onClick={() => {
          signOut();
        }}
      >
        로그아웃{" "}
      </button>
    </>
  ) : (
    <button
      onClick={() => {
        signIn();
      }}
    >
      로그인{" "}
    </button>
  );
};

export default LoginBtn;