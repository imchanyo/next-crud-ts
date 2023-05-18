import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import LoginBtn from "./LoginBtn";

 interface userType {
    name : string;
    email: string;
    image : string;
 }

export default async function Home() {
  const user : userType | null = await getServerSession(authOptions) || null
    return (
    <>
      {user && <LoginBtn {...user}  />}
    </>
  );
}