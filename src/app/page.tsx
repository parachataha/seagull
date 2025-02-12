import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/cookies/getCurrentSession";

export default async function Home() {

  const { user } = await getCurrentSession();
	if (user === null) {
		return redirect("/signup");
	}

  return (
    <div className="wrapper">

      <div className="container">
        <Link href='/signup'>signup</Link>
        <Link href='/login'>login</Link>
        <Link href='/profile'>profile</Link>
      </div>
      
    </div>
  );
}
